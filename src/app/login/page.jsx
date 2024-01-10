"use client";
import { useRouter } from "next/navigation";
import styles from "./loginPage.module.css";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FacebookFilled, GoogleCircleFilled } from "@ant-design/icons";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const { status } = useSession();
  const router = useRouter();
  const storedRedirect = localStorage.getItem("redirectData");
  const [data, setData] = useState({
    account: "",
    password: "",
  });

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

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });
    if (res.status === 401) {
      toast.warning("Tài khoản hoặc mật khẩu không đúng, vui lòng thử lại", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className={styles.container}>
        <h1 style={{ marginTop: 10, marginBottom: 20 }}>Đăng nhập</h1>
        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.item}>
            <label htmlFor="account" className={styles.label}>
              Tài khoản
            </label>
            <input
              id="account"
              name="account"
              required
              value={data.account}
              autoComplete="username"
              type="text"
              className={styles.input}
              onChange={(e) => {
                setData({ ...data, account: e.target.value });
              }}
            />
          </div>
          <div className={styles.item}>
            <label htmlFor="password" className={styles.label}>
              Mật khẩu
            </label>
            <input
              id="password"
              name="password"
              required
              value={data.password}
              autoComplete="current-password"
              type="password"
              className={styles.input}
              onChange={(e) => {
                setData({ ...data, password: e.target.value });
              }}
            />
          </div>
          <div className={styles.item}>
            <button type="submit" className={styles.button}>
              Đăng Nhập
            </button>
          </div>
        </form>
        <p style={{ textAlign: "center", marginBottom: 15 }}>hoặc</p>

        <div className={styles.another}>
          <div className={styles.loginAnother} onClick={() => signIn("google")}>
            <GoogleCircleFilled style={{ fontSize: 25, color: "#2563eb" }} />
            <span>GOOGLE</span>
          </div>
          <div className={styles.loginAnother}>
            <FacebookFilled style={{ fontSize: 25, color: "#2563eb" }} />
            <span>FACEBOOK</span>
          </div>
        </div>
        <p style={{ marginTop: 20 }}>
          Bạn chưa có tài khoản?{" "}
          <Link href="/register" style={{ color: "#2563eb", fontWeight: 600 }}>
            Đăng ký
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
