import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./menuPost.module.css";

const MenuPost = ({ withImage }) => {
  return (
    <div className={styles.items}>
      <Link href="/" className={styles.item}>
        {withImage && (
          <div className={styles.imageContainer}>
            <Image
              src="/p1.jpeg"
              alt=""
              priority={true}
              fill
              className={styles.image}
            />
          </div>
        )}
        <div className={styles.textContainer}>
          <span className={`${styles.category} ${styles.travel}`}>Travel</span>
          <h3 className={styles.postTitle}>
            Tại sao nên sử dụng nestJS Tại sao nên sử dụng nestJ Tại sao nên sử
            dụng nestJS Tại sao nên sử dụng nestJS
          </h3>
          <div className={styles.detail}>
            <span className={styles.username}>ATKill</span>
            <span className={styles.date}> - 10.03.2023</span>
          </div>
        </div>
      </Link>
      {/* ss */}
      <Link href="/" className={styles.item}>
        {withImage && (
          <div className={styles.imageContainer}>
            <Image
              src="/p1.jpeg"
              alt=""
              fill
              priority={true}
              className={styles.image}
            />
          </div>
        )}
        <div className={styles.textContainer}>
          <span className={`${styles.category} ${styles.travel}`}>Travel</span>
          <h3 className={styles.postTitle}>
            Tại sao nên sử dụng nestJS Tại sao nên sử dụng nestJ Tại sao nên sử
            dụng nestJS Tại sao nên sử dụng nestJS
          </h3>
          <div className={styles.detail}>
            <span className={styles.username}>ATKill</span>
            <span className={styles.date}> - 10.03.2023</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MenuPost;
