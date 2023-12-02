"use client";
import { useRouter } from "next/navigation";
import styles from "./loginPage.module.css";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
const LoginPage = () => {
  const { status } = useSession();
  const router = useRouter();
  const storedRedirect = localStorage.getItem("redirectData");

  useEffect(() => {
    if (storedRedirect) {
      setTimeout(() => {
        localStorage.removeItem("redirectData");
      }, 20000);
    }
    if (status === "authenticated") {
      router.push(storedRedirect || "/");
      localStorage.removeItem("redirectData");
    }
  }, [status, router, storedRedirect]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.socialButton} onClick={() => signIn("google")}>
            Sign in with Google
          </div>
          <div className={styles.socialButton}>Sign in with Github</div>
          <div className={styles.socialButton}>Sign in with Facebook</div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
