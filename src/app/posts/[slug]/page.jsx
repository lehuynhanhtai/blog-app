import React from "react";
import styles from "./singlePage.module.css";
import Image from "next/image";
import Menu from "@/components/menu/Menu";
import Comment from "@/components/comment/Comment";
import { findOnePost } from "@/utils/callAPI";
import Link from "next/link";

const SinglePage = async ({ params }) => {
  const { slug } = params;
  const data = await findOnePost(slug);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <Link
            href={`/blog?cat=${data.catSlug}`}
            style={{ textTransform: "capitalize" }}
          >
            {data.cateTitle}
          </Link>
          <h1>{data.title}</h1>
          <div className={styles.user}>
            <div className={styles.userImageContainer}>
              <Image
                src={data.user.image}
                alt=""
                fill
                priority={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                className={styles.avatar}
              />
            </div>

            <div className={styles.userTextContainer}>
              <span className={styles.username}>{data?.user.name}</span>
              <span className={styles.date}>
                {data.createdAt.substring(0, 10)}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src={data.img}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
            priority={true}
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div className={styles.description}>{data.desc}</div>
          <div className={styles.comment}>
            <Comment />
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default SinglePage;
