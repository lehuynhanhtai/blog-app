import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page")) || 1; // Chuyển đổi thành số và mặc định là 1 nếu không có giá trị
  const cat = searchParams.get("cat");

  const pageSize = 2; // Số lượng bài viết mỗi trang
  const query = {
    take: pageSize,
    skip: pageSize * (page - 1), // Bỏ qua số lượng bài viết phù hợp với trang trước đó
    where: {
      ...(cat && { catSlug: cat }),
    },
  };

  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany(query),
      prisma.post.count({ where: query.where }),
    ]);
    const totalPage = Math.ceil(count / pageSize);

    if (posts.length > 0) {
      return new NextResponse(
        JSON.stringify({ page, posts, count, totalPage }, { status: 200 })
      );
    } else {
      return new NextResponse(
        JSON.stringify({ message: "No categories found!" }, { status: 404 })
      );
    }
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
