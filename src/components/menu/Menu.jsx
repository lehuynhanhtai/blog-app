import React from "react";
import styles from "./menu.module.css";
import Link from "next/link";
import Image from "next/image";
import MenuPost from "../menuPost/MenuPost";
import MenuCategories from "../menuCategories/MenuCategories";
const Menu = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.subTitle}>{"Có gì hot?"}</h2>
      <h1 className={styles.title}>Phổ biến nhất</h1>
      <MenuPost withImage={false} />

      <h2 className={styles.subTitle}>Khám phá theo chủ đề</h2>
      <h1 className={styles.title}>Chủ đề</h1>
      <MenuCategories />

      <h2 className={styles.subTitle}>Được biên tập viên lựa chọn</h2>
      <h1 className={styles.title}>Tác giả phổ biến</h1>
      <MenuPost withImage={true} />
    </div>
  );
};

export default Menu;
