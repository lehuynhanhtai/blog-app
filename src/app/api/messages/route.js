import prisma from "@/utils/connect";
import { pusherServer } from "@/utils/pusher";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const data = await prisma.messages.findMany({
      include: {
        user: true,
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

export const POST = async (req) => {
  const body = await req.json();

  try {
    const data = await prisma.messages.create({
      data: {
        text: body.text,
        chatroomId: body.chatroomId,
        userEmail: body.userEmail,
      },
      include: {
        user: true,
      },
    });

    await pusherServer.trigger(body.chatroomId, "incoming-message", {
      message: `${JSON.stringify(data)}\n\n`,
    });

    return new NextResponse(JSON.stringify(data, { status: 200 }));
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
