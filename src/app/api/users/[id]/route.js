import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const GET = async (req, { params }) => {
  const { id } = params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        post: true,
      },
    });
    return new NextResponse(JSON.stringify(user, { status: 200 }));
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

export const DELETE = async (req, { params }) => {
  const { id } = params;
  try {
    const user = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    return new NextResponse(JSON.stringify(user, { status: 200 }));
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

export const PUT = async (request, { params }) => {
  const { id } = params;
  const body = await request.json();
  const {
    name,
    role,
    slogan,
    email,
    password,
    image,
    backgroundUser,
    birthDay,
    sex,
  } = body.formData;
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const data = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        role: role,
        slogan: slogan,
        email: email,
        password: hashPassword,
        image: image,
        backgroundUser: backgroundUser,
        birthDay: birthDay,
        sex: sex,
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
