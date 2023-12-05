"use client";
import Link from "next/link";
import styles from "./authLinks.module.css";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import {
  BookOutlined,
  FormOutlined,
  LogoutOutlined,
  SettingOutlined,
  SnippetsOutlined,
  SolutionOutlined,
} from "@ant-design/icons";

const AuthLinks = () => {
  const { status, data } = useSession();
  const [open, setOpen] = useState(false);

  const handleOpenDropdown = () => {
    setOpen(!open);
  };
  return (
    <>
      {status === "unauthenticated" ? (
        <Link href="/login" className={styles.link}>
          Đăng nhập
        </Link>
      ) : (
        <>
          <Link href="/write" className={styles.link}>
            Viết bài
          </Link>
          <div className={styles.imageContainer} onClick={handleOpenDropdown}>
            <Image
              src="/p1.jpeg"
              alt=""
              priority={true}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
              className={styles.image}
            />
          </div>
        </>
      )}

      {open && (
        <div className={styles.menuDropdown}>
          <div className={styles.userProf}>
            <div className={styles.imageContainerProf}>
              <Image
                src="/p1.jpeg"
                alt=""
                priority={true}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                className={styles.imageUserProf}
              />
            </div>
            <div className={styles.userInfor}>
              <p style={{ fontWeight: 600 }}>lehuynhanhtai@gmail.com</p>
              <p>Biệt danh: Xemgi?</p>
            </div>
          </div>
          <div className={styles.menuLink} onClick={handleOpenDropdown}>
            <Link className={styles.linkDropdown} href="/">
              <SolutionOutlined style={{ marginRight: 10 }} />
              Trang cá nhân
            </Link>
            <Link className={styles.linkDropdown} href="/">
              <FormOutlined style={{ marginRight: 10 }} />
              Bài viết của tôi
            </Link>
            <Link className={styles.linkDropdown} href="/about">
              <SnippetsOutlined style={{ marginRight: 10 }} />
              Nháp của tôi
            </Link>
            <Link className={styles.linkDropdown} href="/contact">
              <BookOutlined style={{ marginRight: 10 }} />
              Đã lưu
            </Link>
            <Link className={styles.linkDropdown} href="/contact">
              <SettingOutlined style={{ marginRight: 10 }} />
              Tùy chỉnh tài khoản
            </Link>
            <span className={styles.linkDropdown} onClick={signOut}>
              <LogoutOutlined style={{ marginRight: 10 }} />
              Đăng xuất
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthLinks;
