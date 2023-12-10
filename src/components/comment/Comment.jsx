"use client";
import React, { useState } from "react";
import styles from "./comment.module.css";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import dateFormat, { masks } from "dateformat";
import {
  DislikeOutlined,
  LikeOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Picker from "@emoji-mart/react";

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
  const { data, mutate, isLoading } = useSWR(
    `http://localhost:3000/api/comments?postSlug=${postSlug}`,
    fetcher
  );
  const { status } = useSession();
  const [desc, setDesc] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSend = async () => {
    if (!desc) {
      alert("Không được để rỗng, vui lòng nhập bình luận!");
      return;
    }

    if (status === "unauthenticated") {
      const redirectTo = window.location.pathname;
      localStorage.setItem("redirectData", redirectTo);
      router.push("/login");
      return;
    }

    const data = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ desc, postSlug }),
    });
    mutate();
    setDesc("");
    return data.json();
  };

  const handleDelete = () => {
    setDesc("");
  };

  const handleSelect = (emojiObject) => {
    setDesc(desc + emojiObject.native);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bình luận</h1>
      <div className={styles.write}>
        <textarea
          placeholder="Hãy viết một bình luận..."
          className={styles.input}
          style={{ resize: "none" }}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <div className={styles.emojiContainer}>
          <SmileOutlined
            onClick={() => setOpen(!open)}
            style={{ fontSize: "25px" }}
          />
          {open && (
            <div className={styles.emoji}>
              <Picker onEmojiSelect={handleSelect} />
            </div>
          )}
        </div>
        <div className={styles.groupButton}>
          <button className={styles.button} onClick={handleSend}>
            Gửi
          </button>
          <button className={styles.button} onClick={handleDelete}>
            Xóa
          </button>
        </div>
      </div>

      <div className={styles.comments}>
        {isLoading
          ? "loading"
          : [...data].reverse().map((item) => (
              <div className={styles.comment} key={item.id}>
                <div className={styles.user}>
                  <Link href={``}>
                    {item?.user?.image && (
                      <Image
                        className={styles.image}
                        src={item?.user?.image}
                        alt=""
                        width={50}
                        height={50}
                        loading="eager"
                        unoptimized={true}
                        decoding="async"
                        timeout={10000}
                      />
                    )}
                  </Link>
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
