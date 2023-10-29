import React from "react";
import styles from "./menu.module.css";
import Link from "next/link";
import Image from "next/image";
import MenuPost from "../menuPost/MenuPost";
import MenuCategories from "../menuCategories/MenuCategories";
const Menu = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.subTitle}>{"What's hot"}</h2>
      <h1 className={styles.title}>Most Popular</h1>
      <MenuPost withImage={false} />

      <h2 className={styles.subTitle}>Discover By topic</h2>
      <h1 className={styles.title}>Topic</h1>
      <MenuCategories />

      <h2 className={styles.subTitle}>Chose by the editer</h2>
      <h1 className={styles.title}>Editors Pick</h1>
      <MenuPost withImage={true} />
    </div>
  );
};

export default Menu;
