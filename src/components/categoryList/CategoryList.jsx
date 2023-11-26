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
            setCategories(data.slice(0, 6));
            setLoading(false); // Đánh dấu đã load xong
          }, 100);
        }
      });
    }
  }, [categories]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Danh mục phổ biến</h1>
      {loading ? (
        <div className={styles.loadingg}>
          <l-bouncy size="45" speed="1" color="#aaa" bg-opacity=".1" />
        </div>
      ) : categories.length === 0 ? (
        <p>Không có dữ liệu</p>
      ) : (
        <div className={styles.categories}>
          {categories?.map((item) => (
            <Link
              href={`/blog?cat=${item.slug}`}
              className={`${styles.category} `}
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
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryList;
