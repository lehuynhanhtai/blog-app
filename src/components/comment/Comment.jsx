import React from "react";
import styles from "./comment.module.css";
import Link from "next/link";
import Image from "next/image";

const Comment = () => {
  const status = "authenticated";
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comment</h1>
      {status === "authenticated" ? (
        <div className={styles.write}>
          <textarea placeholder="Wite a comment..." className={styles.input} />
          <button className={styles.button}>Send</button>
        </div>
      ) : (
        <Link href="/login">Login to write a comment</Link>
      )}
      <div className={styles.comments}>
        <div className={styles.comment}>
          <Image
            className={styles.image}
            src="/p1.jpeg"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
            alt=""
            width={50}
            height={50}
          />
          <div className={styles.userInfo}>
            <span className={styles.username}>ATKill</span>
            <span className={styles.date}>01.01.2023</span>
          </div>
        </div>
        <p className={styles.desc}>hahahaaaaaaaaaaaaaaaas</p>
      </div>
      <div className={styles.comments}>
        <div className={styles.comment}>
          <Image
            className={styles.image}
            src="/p1.jpeg"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
            alt=""
            width={50}
            height={50}
          />
          <div className={styles.userInfo}>
            <span className={styles.username}>ATKill</span>
            <span className={styles.date}>01.01.2023</span>
          </div>
        </div>
        <p className={styles.desc}>hahahaaaaaaaaaaaaaaaas</p>
      </div>
    </div>
  );
};

export default Comment;
