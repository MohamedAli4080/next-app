import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import bcrypt from "bcrypt";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // Basic validation

    const parseResult = registerSchema.safeParse({ name, email, password });
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.issues.map((e) => e.message).join(", ") },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    // Don't return hashedPassword in response
    const { hashedPassword: _, ...userWithoutPassword } = newUser;

    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
