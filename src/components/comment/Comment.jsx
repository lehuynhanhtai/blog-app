"use client";
import React from "react";
import styles from "./comment.module.css";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import dateFormat, { masks } from "dateformat";
import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";

const fetcher = async (url) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }

  return data;
};

const Comment = ({ postSlug }) => {
  const { status } = useSession();
  const { data, isLoading } = useSWR(
    `http://localhost:3000/api/comments?postSlug=${postSlug}`,
    fetcher
  );

  const handleSend = () => {};

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bình luận</h1>
      <div className={styles.write}>
        <textarea
          placeholder="Hãy viết một bình luận..."
          className={styles.input}
          style={{ resize: "none" }}
        />
        <button className={styles.button} onClick={handleSend}>
          Gửi
        </button>
      </div>

      <div className={styles.comments}>
        {isLoading
          ? "loading"
          : data?.map((item) => (
              <div className={styles.comment} key={item.id}>
                <div className={styles.user}>
                  {item?.user?.image && (
                    <Link href={``}>
                      <Image
                        className={styles.image}
                        src={item.user.image}
                        alt=""
                        width={50}
                        height={50}
                      />
                    </Link>
                  )}
                  <div className={styles.userInfo}>
                    <div>
                      <span className={styles.username}>
                        <Link href={``}>{item.user.name}</Link>
                      </span>
                      <span className={styles.date}>
                        {dateFormat(
                          item.createdAt,
                          " mmmm dS, yyyy, h:MM:ss TT"
                        )}
                      </span>
                    </div>
                    <p className={styles.desc}>{item.desc}</p>
                    <div className={styles.vote}>
                      <div>
                        <LikeOutlined /> <span>1</span>
                      </div>
                      <div>
                        <DislikeOutlined /> <span>1</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Comment;
