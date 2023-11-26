import React from "react";
import styles from "./menuCategories.module.css";
import Link from "next/link";
import { findAllCategories } from "@/utils/callAPI";

const MenuCategories = async () => {
  const data = await findAllCategories();
  console.log(data);
  return (
    <div className={styles.categoryList}>
      {data.map((item) => (
        <Link
          href="/blog?cat=style"
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
