"use client";
import React from "react";
import styles from "./menuSideBar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLink = [
  { id: "1", name: "Quản lý danh mục", link: "/dashboard/managecategory" },
  { id: "2", name: "Quản lý người dùng", link: "/dashboard/manageusers" },
  { id: "3", name: "Quản lý bài viết", link: "/dashboard/manageposts" },
];

export default function MenuSideBar() {
  const pathName = usePathname();
  return (
    <div className={styles.container}>
      <section className={styles.sideBar}>
        <Link className={styles.logo} href="/dashboard">
          DASHBOARD
        </Link>
        {navLink.map(({ id, name, link }) => (
          <Link
            rel="preload"
            as={link}
            href={link}
            key={id}
            className={`${pathName === link ? `${styles.active}` : ""} ${
              styles.link
            }`}
          >
            {name}
          </Link>
        ))}
      </section>
    </div>
  );
}
