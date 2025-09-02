import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";


export async function GET() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    const dbusers=await prisma.user.findMany()
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch users" },
        { status: response.status }
      );
    }
    const users = await response.json();
    if (!Array.isArray(users) || users.length === 0) {
      return NextResponse.json({ error: "No users found" }, { status: 404 });
    }
    //return NextResponse.json(users);
    return NextResponse.json(dbusers);
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}


export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Basic validation
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // const response = await fetch("https://jsonplaceholder.typicode.com/users", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     name: body.name,
    //     email: body.email,
    //   }),
    // });

    // if (!response.ok) {
    //   return NextResponse.json(
    //     { error: "Failed to add user" },
    //     { status: response.status }
    //   );
    // }
     
  //   const newUser = await response.json();
  //   return NextResponse.json(newUser, { status: 201 });
  // } catch (error) {
  //   return NextResponse.json(
  //     { error: "An unexpected error occurred" },
  //     { status: 500 }
  //   );


    const isuserExists=await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (isuserExists) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

  const user=await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
    },
  });

    return NextResponse.json(user, { status: 201 });
   
  } catch (error) {
      return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
