"use client";

import { useState } from "react";
import styles from "./register.module.css";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    account: "",
    password: "",
  });
  const handleRegister = () => {};
  return (
    <div className={styles.container}>
      <h1 style={{ marginTop: 10, marginBottom: 20 }}>Tạo tài khoản</h1>
      <form action="" className={styles.form} onSubmit={handleRegister}>
        <div className={styles.item}>
          <label htmlFor="name" className={styles.label}>
            Tên
          </label>
          <input
            id="name"
            name="name"
            required
            value={data.name}
            type="text"
            placeholder="Tên hoặc biệt danh..."
            className={styles.input}
            onChange={(e) => {
              setData({ ...data, name: e.target.value });
            }}
          />
        </div>
        <div className={styles.item}>
          <label htmlFor="account" className={styles.label}>
            Tài khoản
          </label>
          <input
            id="account"
            name="account"
            required
            value={data.account}
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
            type="password"
            className={styles.input}
            onChange={(e) => {
              setData({ ...data, password: e.target.value });
            }}
          />
        </div>
        <div className={styles.item}>
          <button type="submit" className={styles.button}>
            Đăng Ký
          </button>
        </div>
      </form>
    </div>
  );
}
