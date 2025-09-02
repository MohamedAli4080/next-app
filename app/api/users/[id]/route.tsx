import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";


export async function GET(request: Request,
  { params }: { params: { id: string } }
) {
 // const { id } = params;
  //const response = await fetch(
   // `https://jsonplaceholder.typicode.com/posts/${id}`
     `https://jsonplaceholder.typicode.com/posts/1`
 // );

  const dbuser=await prisma.user.findUnique({
    where :{ id :parseInt(params.id)}
  });

  if (!dbuser) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }


  //if (!response.ok) {
   // return NextResponse.json({ error: "Post not found" }, { status: 404 });
 // }
  //const post = await response.json();
  //return NextResponse.json(post);
  return NextResponse.json(dbuser);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    // Basic validation
    if (!body.name && !body.email) {
      return NextResponse.json(
        { error: "At least one of name or email must be provided" },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // If email is being updated, check for uniqueness
    if (body.email && body.email !== user.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email: body.email },
      });
      if (emailExists) {
        return NextResponse.json(
          { error: "Email already in use" },
          { status: 400 }
        );
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(params.id) },
      data: {
        name: body.name !== undefined ? body.name : user.name,
        email: body.email !== undefined ? body.email : user.email,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}





export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = parseInt(params.id);

    if (isNaN(userId)) {
      return NextResponse.json(
        { error: "Invalid user ID" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}


