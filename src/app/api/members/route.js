import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const data = await prisma.members.findMany({});
    return new NextResponse(JSON.stringify(data, { status: 200 }));
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

export const POST = async (request) => {
  const body = await request.json();

  console.log(body);
  try {
    const existingRoom = await prisma.chatroom.findUnique({
      where: {
        id: body.roomId,
      },
    });

    if (!existingRoom) {
      return new NextResponse(
        JSON.stringify({ message: "Không tồn tại phòng chat" }),
        { status: 500 }
      );
    }

    const newMember = await prisma.members.create({
      data: {
        userEmail: body.userEmail,
        roomId: body.roomId,
      },
    });

    return new NextResponse(JSON.stringify(newMember, { status: 200 }));
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
