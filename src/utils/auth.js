import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./connect";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        password: { label: "password", type: "password" },
        account: { label: "account", type: "text" },
      },
      async authorize(credentials) {
        //kiem tra tai khoan da ton tai
        if (!credentials.account || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.account,
          },
        });

        if (!user) {
          return null;
        }

        // kiem tra password
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!passwordMatch) {
          return null;
        }
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, user }) {
      const inforUser = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
        include: {
          chatRoom: true,
        },
      });
      user = inforUser;

      return { session, user };
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
