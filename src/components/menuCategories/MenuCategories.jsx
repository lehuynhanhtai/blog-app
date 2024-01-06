import React from "react";
import styles from "./menuCategories.module.css";
import Link from "next/link";
import { findAllCategories } from "@/utils/callAPI";

const MenuCategories = async () => {
  const data = await findAllCategories();
  return (
    <div className={styles.categoryList}>
      {data.map((item) => (
        <Link
          href={`/blog?cat=${item.slug}`}
          className={`${styles.categoryItem} ${styles.style}`}
          key={item.id}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default MenuCategories;
