import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const PUT = async (request, { params }) => {
  const { id } = params;
  const body = await request.json();
  const { slug, title, desc, img, catSlug } = body.formData;
  try {
    const data = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        slug: slug,
        title: title,
        desc: desc,
        img: img,
        catSlug: catSlug,
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

export const DELETE = async (req, { params }) => {
  const { id } = params;
  try {
    const data = await prisma.post.delete({
      where: {
        id: id,
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
