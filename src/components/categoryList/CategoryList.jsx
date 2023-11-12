"use client";
import React, { useState, useEffect } from "react";
import styles from "./categoryList.module.css";
import Link from "next/link";
import Image from "next/image";
import { findAllCategories } from "@/utils/callAPI";
import { bouncy } from "ldrs";

bouncy.register();

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Kiểm tra nếu dữ liệu rỗng thì gọi findAllCategories
    if (categories.length === 0) {
      findAllCategories().then((data) => {
        if (data.length === 0) {
          setCategories([]);
          setLoading(false); // Đánh dấu đã load xong
        } else {
          setTimeout(() => {
            setCategories(data);
            setLoading(false); // Đánh dấu đã load xong
          }, 500);
        }
      });
    }
  }, [categories]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular Categories</h1>
      {loading ? (
        <l-bouncy size="45" speed="1.75" color="#aaa" bg-opacity=".1" />
      ) : categories.length === 0 ? (
        <p>Không có dữ liệu</p>
      ) : (
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
      )}
    </div>
  );
};

export default CategoryList;
