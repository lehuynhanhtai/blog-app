import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const data = await prisma.chatroom.findMany({
      include: {
        members: true,
        messages: true,
      },
    });
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
  try {
    const newRoom = await prisma.chatroom.create({
      data: {
        roomName: body.roomName,
        userEmail: body.userEmail,
      },
    });
    return new NextResponse(JSON.stringify(newRoom, { status: 200 }));
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
