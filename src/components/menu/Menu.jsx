import React from "react";
import styles from "./menu.module.css";
import MenuPopular from "../menuPopular/MenuPopular";
import MenuCategories from "../menuCategories/MenuCategories";
import MenuAuthor from "../menuAuthor/MenuAuthor";
import Link from "next/link";
const Menu = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.subTitle}>{"Có gì hot?"}</h2>
      <h1 className={styles.title}>Phổ biến nhất</h1>
      <MenuPopular />

      <h2 className={styles.subTitle}>Khám phá theo chủ đề</h2>
      <h1 className={styles.title}>Chủ đề</h1>
      <MenuCategories />

      <h2 className={styles.subTitle}>Được người dùng lựa chọn</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <h1 className={styles.title}>Ngòi bút nổi bật</h1>
        <Link href="/users">Xem thêm</Link>
      </div>
      <MenuAuthor />
    </div>
  );
};

export default Menu;
