import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        posts: true,
      },
    });

    if (categories.length > 0) {
      return new NextResponse(JSON.stringify(categories, { status: 200 }));
    } else {
      return new NextResponse(
        JSON.stringify({ message: "No categories found!" }, { status: 404 })
      );
    }
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

export async function POST(req) {
  const body = await req.json();
  console.log(body);
}
