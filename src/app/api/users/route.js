import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const GET = async () => {
  try {
    const users = await prisma.user.findMany({
      include: { post: true, comment: true },
    });

    return new NextResponse(JSON.stringify(users, { status: 200 }));
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

export const POST = async (request) => {
  const body = await request.json();
  const { name, role, slogan, email, password, image, backgroundUser } =
    body.formData;
  if (!name || !email || !password) {
    return NextResponse("Tên, tài khoản, hoặc mật khẩu đang bị trống", {
      status: 400,
    });
  }
  const exist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (exist) {
    return new NextResponse("Tài khoản đã tồn tại", { status: 400 });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name: name,
      role: role,
      slogan: slogan,
      email: email,
      password: hashPassword,
      image: image,
      backgroundUser: backgroundUser,
    },
  });
  return new NextResponse(JSON.stringify(user, { status: 200 }));
};
