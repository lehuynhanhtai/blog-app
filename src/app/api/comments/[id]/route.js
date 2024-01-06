import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
  const { id } = params;
  try {
    const data = await prisma.comment.delete({
      where: {
        id: id,
      },
    });
    return new NextResponse(JSON.stringify(data, { status: 200 }));
  } catch (error) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

export const PUT = async (req, { params }) => {
  const { id } = params;
  const body = await req.json();
  try {
    const data = await prisma.comment.update({
      where: {
        id: id,
      },
      data: {
        desc: body.desc,
      },
    });
    return new NextResponse(JSON.stringify(data, { status: 200 }));
  } catch (error) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
