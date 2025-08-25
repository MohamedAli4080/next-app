import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  if (!response.ok) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
  const post = await response.json();
  return NextResponse.json(post);
}
