import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  if (req.method === "GET") {
    try {
      const body = searchParams.get("q");
      const posts = await prisma.post.findMany({
        where: {
          OR: [
            { title: { contains: body, mode: "insensitive" } },
            { desc: { contains: body, mode: "insensitive" } },
          ],
        },
        include: {
          user: true,
          cat: true,
        },
      });
      return new NextResponse(JSON.stringify(posts, { status: 200 }));
    } catch (error) {
      console.log(error);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
      );
    }
  }
};
