"use client";
import React, { useContext } from "react";
import styles from "./navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "../themeToggle/ThemeToggle";
import AuthLinks from "../authLinks/AuthLinks";
import { ThemeContext } from "@/context/ThemeContext";

const Navbar = () => {
  const { theme } = useContext(ThemeContext);
  const logoSrc = theme === "dark" ? "/whiteLogo.png" : "/blackLogo.png";
  return (
    <div className={styles.container}>
      <div className={styles.social}>
        <Image src="/facebook.png" alt="facebook" width={24} height={24} />
        <Image src="/instagram.png" alt="instagram" width={24} height={24} />
        <Image src="/youtube.png" alt="youtube" width={24} height={24} />
      </div>
      <Link href="/" as="/" className={styles.logo} rel="preload">
        <Image
          className={styles.imageLogo}
          src={logoSrc}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
          priority="true"
        />
      </Link>
      <div className={styles.links}>
        <ThemeToggle />
        <Link href="/" className={styles.link}>
          Trang chủ
        </Link>
        <Link href="/contact" className={styles.link}>
          Liên hệ
        </Link>
        <Link href="/about" className={styles.link}>
          Về SBLOG
        </Link>
        <AuthLinks />
      </div>
    </div>
  );
};

export default Navbar;
