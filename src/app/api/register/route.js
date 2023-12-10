import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (request) => {
  const body = await request.json();
  const { name, account, password } = body.data;

  if (!name || !account || !password) {
    return NextResponse("Tên, tài khoản, hoặc mật khẩu đang bị trống", {
      status: 400,
    });
  }
  const exist = await prisma.user.findUnique({
    where: {
      email: account,
    },
  });

  if (exist) {
    return new NextResponse("Tài khoản đã tồn tại", { status: 400 });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name: name,
      email: account,
      password: hashPassword,
    },
  });
  return new NextResponse(JSON.stringify(user, { status: 200 }));
};
