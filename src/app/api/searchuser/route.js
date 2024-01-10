import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  try {
    const query = searchParams.get("query");
    const users = await prisma.user.findMany({
      where: {
        OR: [{ name: { contains: query, mode: "insensitive" } }],
      },
    });
    return new NextResponse(JSON.stringify(users, { status: 200 }));
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
}
