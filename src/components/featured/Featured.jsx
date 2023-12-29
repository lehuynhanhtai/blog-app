"use client";
import React from "react";
import styles from "./featured.module.css";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
const Featured = () => {
  return (
    <div className={styles.container}>
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image
            src="/daidien.png"
            alt=""
            priority={true}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
            className={styles.image}
          />
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>
            CHÀO MỪNG CÁC BẠN ĐÃ ĐẾN VỚI S-BLOG
          </h1>
          <p className={styles.postDesc}>
            S-BLOG là mạng xã hội, nơi chia sẽ quan điểm - kiến thức đến với
            giới trẻ, S-BLOG đã phát triển một hệ sinh thái lớn mạnh, đa nền
            tảng, với mục tiêu hỗ trợ và kết nối các cá nhân/nhóm tri thức trong
            xã hội.
          </p>
          <button className={styles.button}>Read More</button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
