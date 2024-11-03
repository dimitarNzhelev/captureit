import { db } from "~/server/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const posts = await db.post.findMany({
      include: {
        createdBy: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}