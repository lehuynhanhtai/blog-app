import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const popularPost = await prisma.post.findMany({
      include: {
        user: true,
        cat: true,
      },
    });

    return new NextResponse(JSON.stringify(popularPost, { status: 200 }));
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
