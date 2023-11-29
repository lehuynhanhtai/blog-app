import React from "react";
import styles from "./comment.module.css";
import Link from "next/link";
import Image from "next/image";

const Comment = () => {
  const status = "authenticated";
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bình luận</h1>
      {status === "authenticated" ? (
        <div className={styles.write}>
          <textarea
            placeholder="Hãy viết một bình luận..."
            className={styles.input}
            style={{ resize: "none" }}
          />
          <button className={styles.button}>Gửi</button>
        </div>
      ) : (
        <Link href="/login">Bạn hãy đăng nhập để bình luận.</Link>
      )}
      <div className={styles.comments}>
        <div className={styles.comment}>
          <Image
            className={styles.image}
            src="/p1.jpeg"
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
