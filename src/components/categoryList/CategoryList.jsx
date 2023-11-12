"use client";
import React, { useState, useEffect } from "react";
import styles from "./categoryList.module.css";
import Link from "next/link";
import Image from "next/image";
import { findAllCategories } from "@/utils/callAPI";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Kiểm tra nếu dữ liệu rỗng thì gọi findAllCategories
    if (categories.length === 0) {
      findAllCategories().then((data) => {
        setCategories(data);
      });
    }
  }, [categories]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular Categories</h1>
      <div className={styles.categories}>
        {categories?.map((item) => (
          <Link
            href="/blog?cat=style"
            className={`${styles.category} ${styles[item.title]}`}
            key={item.id}
          >
            {item.img && (
              <Image
                src={item.img}
                alt=""
                width={32}
                height={32}
                className={styles.image}
              />
            )}
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
