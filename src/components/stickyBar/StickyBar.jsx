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
import { useEffect, useState } from "react";

const StickyBar = () => {
  const [display, setDisplay] = useState(false);

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

  return (
    <>
      {display && (
        <div className={styles.container}>
          <LikeOutlined className={styles.icon} />
          {12}
          <DislikeOutlined className={styles.icon} />
          <div className={styles.userImageContainer}>
            <Image
              src="/p1.jpeg"
              alt=""
              fill
              priority={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
              className={styles.avatar}
            />
          </div>
          <BookOutlined className={styles.icon} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CommentOutlined className={styles.icon} />
            {2}
          </div>
          <ShareAltOutlined className={styles.icon} />
        </div>
      )}
    </>
  );
};

export default StickyBar;
