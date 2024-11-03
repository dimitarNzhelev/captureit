import { s3Client } from "~/lib/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { db } from "~/server/db";
import { getServerAuthSession } from "~/server/auth";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import { env } from "~/env";

export async function POST(req: Request) {
  const session = await getServerAuthSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { caption, image } = await req.json();

  if (!image) {
    return NextResponse.json({ message: "Image is required" }, { status: 400 });
  }

  const imageBuffer = Buffer.from(image, "base64");
  const imageKey = `posts/${uuidv4()}.jpg`;

  try {
    await s3Client.send(
      new PutObjectCommand({
        Bucket: env.AWS_BUCKET_NAME!,
        Key: imageKey,
        Body: imageBuffer,
        ContentType: "image/jpeg",
      })
    );

    const imageURL = `https://${env.AWS_BUCKET_NAME}.s3.${env.AWS_REGION}.amazonaws.com/${imageKey}`;

    const post = await db.post.create({
      data: {
        name: caption,
        createdById: session.user.id,
        imageURL,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
