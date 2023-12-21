"use client";
import React, { useContext } from "react";
import styles from "./footer.module.css";
import Image from "next/image";
import Link from "next/link";
import { ThemeContext } from "@/context/ThemeContext";
const Footer = () => {
  const { theme } = useContext(ThemeContext);
  const logoSrc = theme === "dark" ? "/whiteLogo.png" : "/blackLogo.png";
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Link href="/" className={styles.logo} as="/" rel="preload">
          <Image
            className={styles.imageLogo}
            src={logoSrc}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
            priority="true"
          />
        </Link>
        <div className={styles.desc}>
          <p>
            <b>Công ty Cổ Phần BV</b>
          </p>

          <p>
            Mạng xã hội S-BLOG nơi chia sẻ quan điểm - kiến thức hàng đầu Việt
            Nam
          </p>
          <p>Trực thuộc Công ty Cổ Phần S-BLOG Việt Nam (S-BLOG Vietnam JSC)</p>
          <p>
            Người chịu trách nhiệm nội dung: <b>Lê Huỳnh Anh Tài</b>
          </p>
          <p>
            Giấy phép MXH số 341/GP-TTTT do Bộ TTTT cấp ngày 01 tháng 01 năm
            2024
          </p>
        </div>
        <div className={styles.icons}>
          <Image src="/facebook.png" alt="" width={18} height={18} />
          <Image src="/instagram.png" alt="" width={18} height={18} />
          <Image src="/youtube.png" alt="" width={18} height={18} />
        </div>
      </div>
      <div className={styles.links}>
        <div className={styles.list}>
          <span className={styles.listTitle}>Links</span>
          <Link href="/">Trang chủ</Link>
          <Link href="/">Blog</Link>
          <Link href="/">Về SBLOG</Link>
          <Link href="/">Liên hệ</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Tags</span>
          <Link href="/">Style</Link>
          <Link href="/">Fashion</Link>
          <Link href="/">Coding</Link>
          <Link href="/">Travel</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Social</span>
          <Link href="/">Facebook</Link>
          <Link href="/">Instagram</Link>
          <Link href="/">Tiktok</Link>
          <Link href="/">Youtube</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
