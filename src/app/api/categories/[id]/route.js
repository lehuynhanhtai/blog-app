import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;
  try {
    const data = await prisma.category.findUnique({
      where: {
        id: id,
      },
      include: {
        posts: true,
      },
    });
    return new NextResponse(JSON.stringify(data, { status: 200 }));
  } catch (error) {
    return new NextResponse.json({ message: "can't delete" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    const data = await prisma.category.delete({
      where: {
        id: id,
      },
    });
    return new NextResponse(JSON.stringify(data, { status: 200 }));
  } catch (error) {
    return new NextResponse.json({ message: "can't delete" }, { status: 500 });
  }
}
