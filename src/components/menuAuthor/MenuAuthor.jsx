import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./menuAuthor.module.css";
import { popularPosts } from "@/utils/callAPI";
import { EyeOutlined } from "@ant-design/icons";
import dateFormat, { masks } from "dateformat";

const MenuAuthor = async () => {
  const data = await popularPosts();
  return (
    <div className={styles.items}>
      {data
        .sort((a, b) => b.views - a.views)
        .slice(0, 4)
        .map((item) => (
          <div className={styles.item} key={item.id}>
            {item?.user?.image && (
              <Link href="/" className={styles.imageContainer}>
                <Image
                  src={item?.user?.image}
                  alt=""
                  priority={true}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                  className={styles.image}
                />
              </Link>
            )}
            <div className={styles.textContainer}>
              <Link
                href={`/blog?cat=${item.catSlug}`}
                className={styles.category}
              >
                {item.cateTitle}
              </Link>
              <h3 className={styles.postTitle}>
                <Link href={`/posts/${item.slug}`}>{item.title}</Link>
              </h3>
              <div className={styles.detail}>
                <div className={styles.author}>
                  <span className={styles.username}>{item.user.name}</span>
                  <span className={styles.date}>
                    {" "}
                    - {dateFormat(item.createdAt, " dd-mm-yyyy")}
                  </span>
                </div>
                <span className={styles.views}>
                  <EyeOutlined /> {item.views}
                </span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MenuAuthor;
