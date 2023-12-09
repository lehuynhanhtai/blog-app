import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { id } = params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return new NextResponse(JSON.stringify(user, { status: 200 }));
  } catch (error) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
