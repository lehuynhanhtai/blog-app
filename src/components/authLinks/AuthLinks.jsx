"use client";
import Link from "next/link";
import styles from "./authLinks.module.css";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import {
  FormOutlined,
  LogoutOutlined,
  MenuOutlined,
  SettingOutlined,
  SnippetsOutlined,
  SolutionOutlined,
  WechatOutlined,
} from "@ant-design/icons";

const AuthLinks = () => {
  const { status, data } = useSession();
  const [open, setOpen] = useState(false);
  const [openMenuResponse, setOpenMenuResponse] = useState(false);
  const handleOpenDropdown = () => {
    setOpen(!open);
  };
  const handleOpenMenu = () => {
    setOpenMenuResponse(!openMenuResponse);
  };
  return (
    <>
      {status === "unauthenticated" ? (
        <>
          <Link href="/login" className={styles.link}>
            Đăng nhập
          </Link>
          <MenuOutlined className={styles.bugger} onClick={handleOpenMenu} />
        </>
      ) : (
        <>
          <Link href="/write" className={styles.link}>
            Viết bài
          </Link>
          <div className={styles.imageContainer} onClick={handleOpenDropdown}>
            {data?.user?.image && (
              <Image
                src={data.user.image}
                alt=""
                priority={true}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                className={styles.image}
                loading="eager"
                unoptimized={true}
                decoding="async"
                timeout={10000}
              />
            )}
          </div>
          <MenuOutlined className={styles.bugger} onClick={handleOpenMenu} />
        </>
      )}

      {open && (
        <div className={styles.menuDropdown}>
          <div className={styles.userProf}>
            <div className={styles.imageContainerProf}>
              {data?.user?.image && (
                <Image
                  src={data?.user?.image}
                  alt=""
                  priority={true}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                  className={styles.imageUserProf}
                  loading="eager"
                  unoptimized={true}
                  decoding="async"
                  timeout={10000}
                />
              )}
            </div>
            <div className={styles.userInfor}>
              <p style={{ fontWeight: 600 }}>{data?.user.email}</p>
              <p>{data?.user.name}</p>
            </div>
          </div>
          <div className={styles.menuLink} onClick={handleOpenDropdown}>
            <Link
              className={styles.linkDropdown}
              href={`/users/${data?.user.id}`}
            >
              <SolutionOutlined style={{ marginRight: 10 }} />
              Trang cá nhân
            </Link>
            <Link
              className={styles.linkDropdown}
              href={`/users/${data?.user.id}?tab=createdPosts`}
            >
              <FormOutlined style={{ marginRight: 10 }} />
              Bài viết của tôi
            </Link>
            <Link className={styles.linkDropdown} href="/">
              <SnippetsOutlined style={{ marginRight: 10 }} />
              Nháp của tôi
            </Link>
            <Link className={styles.linkDropdown} href="/chat">
              <WechatOutlined style={{ marginRight: 10 }} />
              Chat
            </Link>
            <Link
              className={styles.linkDropdown}
              href={`/editprofile/${data?.user.id}`}
            >
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

      {openMenuResponse && (
        <div className={styles.responsiveMenu} onClick={handleOpenMenu}>
          <Link href="/">Trang chủ</Link>
          <Link href="/about">Về S-BLOG</Link>
          <Link href="/contact">Liên hệ</Link>
          <Link href="/search">Tìm kiếm</Link>
        </div>
      )}
    </>
  );
};

export default AuthLinks;
