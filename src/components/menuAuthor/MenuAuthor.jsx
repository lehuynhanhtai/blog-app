import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./menuAuthor.module.css";
import { PlusSquareOutlined } from "@ant-design/icons";
import { getAllUser } from "@/utils/callAPI";

const MenuAuthor = async () => {
  const data = await getAllUser();
  const sortedData = data.sort((a, b) => b.post.length - a.post.length);

  return (
    <div className={styles.items}>
      {sortedData.slice(0, 4).map((items) => (
        <div className={styles.item} key={items.id}>
          <Link href={`users/${items.id}`} className={styles.imageContainer}>
            {items?.image && (
              <Image
                src={items?.image}
                alt=""
                priority={true}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                className={styles.image}
                loading="eager"
                unoptimized={true}
                decoding="async"
                timeout={10000}
              />
            )}
          </Link>
          <div className={styles.inforContainer}>
            <div className={styles.detail}>
              <p className={styles.userName}>{items.name}</p>
              <q className={styles.slogan}>{items.slogan}</q>
            </div>
            <div className={styles.follow}>
              <PlusSquareOutlined className={styles.iconFollow} />
              <span className={styles.tooltipText}>dang Theo dõi</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuAuthor;
