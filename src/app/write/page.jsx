"use client";
import React, { useState, useEffect } from "react";
import styles from "./writePage.module.css";
import Image from "next/image";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const WritePage = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(false);
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  return (
    <>
      <div className={styles.container}>
        <input className={styles.input} type="text" placeholder="Title" />
        <div className={styles.choseButton}>
          <button className={styles.button} onClick={() => setOpen(!open)}>
            <Image src="/plus.png" alt="" width={16} height={16} />
          </button>
          {open && (
            <div className={styles.add}>
              <button className={styles.addButton}>
                <Image src="/image.png" alt="" width={16} height={16} />
              </button>
              <button className={styles.addButton}>
                <Image src="/external.png" alt="" width={16} height={16} />
              </button>
              <button className={styles.addButton}>
                <Image src="/video.png" alt="" width={16} height={16} />
              </button>
            </div>
          )}
        </div>
        <div className={styles.editor}>
          <ReactQuill
            className={styles.textArea}
            theme="bubble"
            value={value}
            onChange={setValue}
            placeholder="Tell your story..."
          />
          <button className={styles.publish}>Publish</button>
        </div>
      </div>
    </>
  );
};

export default WritePage;
