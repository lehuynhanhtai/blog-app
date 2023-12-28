"use client";
import {
  BookOutlined,
  CommentOutlined,
  DislikeOutlined,
  LikeOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import styles from "./stickyBar.module.css";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const StickyBar = ({ dataPost, postSlug }) => {
  const [display, setDisplay] = useState(false);
  const [votes, setVotes] = useState(dataPost.votes);

  useEffect(() => {
    const handleScroll = () => {
      const contentElement = document.getElementById("post-content");
      const scrollY = window.scrollY;

      if (contentElement) {
        const contentBottom = contentElement.getBoundingClientRect().bottom;

        if (contentBottom > window.innerHeight && scrollY > 300) {
          setDisplay(true);
        } else {
          setDisplay(false);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleUpVotes = async () => {
    setVotes(votes + 1);
  };

  const handleDownVotes = async () => {
    setVotes(votes - 1);
  };

  const handleClickComment = () => {
    const contentDiv = document.getElementById("comments");
    if (contentDiv) {
      contentDiv.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {display && (
        <div className={styles.container}>
          <LikeOutlined className={styles.icon} onClick={handleUpVotes} />
          {votes}
          <DislikeOutlined className={styles.icon} onClick={handleDownVotes} />
          <Link
            href={`/users/${dataPost?.user.id}`}
            className={styles.userImageContainer}
          >
            {dataPost?.user.image && (
              <Image
                src={dataPost?.user.image}
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
            )}
          </Link>
          <BookOutlined className={styles.icon} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CommentOutlined
              className={styles.icon}
              onClick={handleClickComment}
            />
            <p style={{ marginTop: 15 }}>{dataPost?.comments.length}</p>
          </div>
          <ShareAltOutlined className={styles.icon} />
        </div>
      )}
    </>
  );
};

export default StickyBar;
