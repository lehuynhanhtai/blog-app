"use client";
import React, { useState, useEffect } from "react";
import styles from "./writePage.module.css";
import Image from "next/image";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { findAllCategories } from "@/utils/callAPI";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/utils/firebase";
import slugify from "slugify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatBot from "@/components/chatbot/ChatBot";

const storage = getStorage(app);

const WritePage = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { status } = useSession();
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(); // Hinh anh
  const [media, setMedia] = useState(""); // Link URL image
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [catSlug, setCatSlug] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
    async function fetchData() {
      const response = await findAllCategories();
      setCategories(response);
      setCatSlug(response[0].slug);
    }
    fetchData();

    const upload = () => {
      const name = new Date().getTime + file.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL);
          });
        }
      );
    };
    file && upload();
  }, [status, router, file]);

  const handleSubmit = async () => {
    const res = await fetch("api/posts", {
      method: "POST",
      body: JSON.stringify({
        slug: slugify(title, { lower: true, locale: "vi" }),
        title: title,
        desc: description,
        img: media,
        catSlug: catSlug,
      }),
    });

    if (!title || !description || !media) {
      toast.error("bạn chưa nhập đầy đủ", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    if (res.status === 200 && title && description && media) {
      toast.success("Đăng bài thành công!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTitle(" ");
      setDescription("");
      setMedia("");
    }
  };

  return (
    <>
      <div className={styles.container}>
        <input
          className={styles.input}
          type="text"
          placeholder="Nhập tiêu đề"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className={styles.category}>
          <label htmlFor="category">Chọn thể loại</label>
          <select
            id="category"
            name="category"
            className={styles.selectCategory}
            value={catSlug}
            onChange={(e) => setCatSlug(e.target.value)}
          >
            {categories?.map((item) => (
              <option key={item.id} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.choseButton}>
          <button className={styles.button} onClick={() => setOpen(!open)}>
            <Image src="/plus.png" alt="" width={16} height={16} />
          </button>

          {open && (
            <div className={styles.add}>
              <input
                type="file"
                id="image"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
              <button className={styles.addButton}>
                <label htmlFor="image" style={{ cursor: "pointer" }}>
                  <Image src="/image.png" alt="" width={16} height={16} />
                </label>
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
        <div className={styles.notification}>
          {media ? "Upload ảnh thành công" : ""}
        </div>
        <div className={styles.editor}>
          <ReactQuill
            className={styles.textArea}
            theme="bubble"
            placeholder="Viết nội dung..."
            value={description}
            onChange={setDescription}
          />
          <button className={styles.publish} onClick={handleSubmit}>
            Publish
          </button>
        </div>
      </div>
      <ChatBot />
      <ToastContainer />
    </>
  );
};

export default WritePage;
