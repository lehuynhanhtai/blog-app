import React from "react";
import styles from "./singlePage.module.css";
import Image from "next/image";
import Comment from "@/components/comment/Comment";
import { findOnePost } from "@/utils/callAPI";
import Link from "next/link";
import dateFormat from "dateformat";
import StickyBar from "@/components/stickyBar/StickyBar";

const SinglePage = async ({ params }) => {
  const { slug } = params;
  const data = await findOnePost(slug);

  return (
    <div className={styles.container}>
      <StickyBar />

      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <Link href={`/blog?cat=${data.catSlug}`} className={styles.category}>
            {data.cat?.name}
          </Link>
          <h1 style={{ fontSize: 45 }}>{data.title}</h1>
          <div className={styles.user}>
            <div className={styles.userImageContainer}>
              <Image
                src={data.user?.image}
                alt=""
                fill
                priority={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                className={styles.avatar}
                loading="eager"
                unoptimized={true}
                decoding="async"
                timeout={10000}
              />
            </div>

            <div className={styles.userTextContainer}>
              <span className={styles.username}>{data?.user?.name}</span>
              <span className={styles.date}>
                {dateFormat(data.createdAt, "dd-mm-yyyy")}
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
          <div
            id="post-content"
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: data?.desc }}
          ></div>
          <div className={styles.comment}>
            <Comment postSlug={slug} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
