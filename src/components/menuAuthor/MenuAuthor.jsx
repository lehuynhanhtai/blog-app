import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./menuAuthor.module.css";
import dateFormat, { masks } from "dateformat";
import { PlusOutlined, PlusSquareOutlined } from "@ant-design/icons";

const MenuAuthor = async () => {
  return (
    <div className={styles.items}>
      <div className={styles.item}>
        <Link href="/" className={styles.imageContainer}>
          <Image
            src="/p1.jpeg"
            alt=""
            priority={true}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
            className={styles.image}
          />
        </Link>
        <div className={styles.inforContainer}>
          <div className={styles.detail}>
            <p className={styles.userName}>lehuynhanhtai@gmail.com sssssssss</p>
            <q className={styles.slogan}>yêu bao lâu thì cho nắm tay</q>
          </div>
          <div className={styles.follow}>
            <PlusSquareOutlined className={styles.iconFollow} />
            <span className={styles.tooltipText}>dang Theo dõi</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuAuthor;
