"use client";
import { useRouter } from "next/navigation";
import styles from "./loginPage.module.css";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

const LoginPage = () => {
  const { status } = useSession();
  const route = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      route.push("/");
    }
  }, [status, route]);

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
