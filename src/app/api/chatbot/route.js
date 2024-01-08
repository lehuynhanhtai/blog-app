import prisma from "@/utils/connect";
import openai from "@/utils/openai";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/utils/auth";
import { OpenAIStream, StreamingTextResponse } from "ai";

// export const POST = async (req) => {
//   const session = await getAuthSession();

//   if (!session) {
//     return new NextResponse(
//       JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
//     );
//   }

//   try {
//     const body = await req.json();

//     const completion = await openai.chat.completions.create({
//       messages: [{ role: "user", content: body.userMessage }],
//       model: "gpt-3.5-turbo",
//     });
//     const responseText = completion.choices;
//     const data = await prisma.chatbot.create({
//       data: {
//         userMessage: body.userMessage,
//         userEmail: session.user.email,
//         botMessage: responseText[0].message.content,
//       },
//     });
//     return new NextResponse(JSON.stringify(data, { status: 200 }));
//   } catch (error) {
//     console.log(error);
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
//     );
//   }
// };

export const POST = async (req) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }
  const { messages } = await req.json();
  const res = await openai.chat.completions.create({
    stream: true,
    model: "gpt-3.5-turbo",
    messages: messages,
  });
  const stream = OpenAIStream(res, {
    onCompletion: async (completion) => {
      await prisma.chatbot.create({
        data: {
          userMessage: messages.slice(-1)[0].content,
          botMessage: completion,
          userEmail: session.user.email,
        },
      });
    },
  });

  return new StreamingTextResponse(stream);
};

// export const GET = async () => {
//   try {
//     const dataMessage = await prisma.chatbot.findMany({
//       include: {
//         user: true,
//       },
//     });
//     return new NextResponse(JSON.stringify(dataMessage, { status: 200 }));
//   } catch (error) {
//     console.log(error);
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
//     );
//   }
// };
