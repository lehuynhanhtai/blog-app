"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Middleware() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
    if (session?.user.role === "USER") {
      router.push("/");
      alert("Bạn không phải là admin");
    }
  }, [router, status, session]);
  return null;
}
