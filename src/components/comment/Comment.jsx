"use client";
import React, { useState } from "react";
import styles from "./comment.module.css";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import dateFormat, { masks } from "dateformat";
import {
  CompressOutlined,
  DeleteOutlined,
  DislikeOutlined,
  EditOutlined,
  LikeOutlined,
  MoreOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Picker from "@emoji-mart/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const { status, data: session } = useSession();
  const [desc, setDesc] = useState("");
  const [open, setOpen] = useState(false);
  const [showOptions, setShowOptions] = useState({});
  const [showModalItem, setShowModalItem] = useState({});
  const [itemReport, setItemReport] = useState({});
  const [descEdit, setDescEdit] = useState("");
  const [modalReport, setModalReport] = useState(false);
  const [descReport, setDescReport] = useState("");
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

  const handleShowMore = (itemId) => {
    setShowOptions((prevOptions) => ({
      ...prevOptions,
      [itemId]: !prevOptions[itemId],
    }));
  };

  const handleDeleteComment = async (id) => {
    const res = await fetch(`/api/comments/${id}`, {
      method: "DELETE",
    });
    if (res.status === 200) {
      toast.success("Xóa bình luận thành công!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      mutate();
      return;
    }
    if (res.status !== 200) {
      toast.warning("Xóa bình luận không thành công!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
  };

  const handleEditComment = (item) => {
    setShowModalItem((prevOptions) => ({
      ...prevOptions,
      [item.id]: !prevOptions[item.id],
    }));
    setDescEdit(item.desc);
  };

  const handleConfirmEdit = async (item) => {
    const res = await fetch(`/api/comments/${item.id}`, {
      method: "PUT",
      body: JSON.stringify({
        desc: descEdit,
      }),
    });
    if (res.status === 200) {
      toast.success("Sửa bình luận thành công!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setShowModalItem(!showModalItem);
      setShowOptions(!showOptions);
      mutate();
      return;
    }
    if (res.status !== 200) {
      toast.warning("Sửa bình luận không thành công!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
  };

  const handleReport = (item) => {
    setModalReport(true);
    setItemReport(item);
  };

  const handleClose = () => {
    setModalReport(false);
  };

  const handleConfirmModal = async () => {
    const res = await fetch(`/api/comments/${itemReport.id}`, {
      method: "PUT",
      body: JSON.stringify({ report: descReport }),
    });

    if (res.status === 200) {
      toast.success("Báo cáo vi phạm thành công!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setModalReport(false);
      return;
    }

    if (res.status !== 200) {
      toast.error("Đã xảy ra lỗi vui lòng thử lại!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
  };

  return (
    <div id="comments" className={styles.container}>
      <ToastContainer />
      {modalReport && (
        <div className={styles.modal}>
          <div className={styles.overlay}></div>
          <div className={styles.modalContent}>
            <h2>Báo cáo vi phạm</h2>
            <input
              className={styles.inputModal}
              type="text"
              id="slug"
              placeholder="Nhập nội dung vi phạm..."
              name="slug"
              value={descReport}
              onChange={(e) => setDescReport(e.target.value)}
            />
            <div className={styles.buttonGroup}>
              <button className={styles.closeModal} onClick={handleClose}>
                Đóng
              </button>
              <button
                className={styles.confirmModal}
                onClick={handleConfirmModal}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}

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
                    <p className={styles.modalEdit}>
                      {showModalItem[item.id] && (
                        <>
                          <input
                            style={{
                              background: "none",
                              outline: "none",
                              border: "none",
                              color: "#e1cf50",
                              fontSize: 18,
                            }}
                            type="text"
                            name="descEdit"
                            value={descEdit}
                            onChange={(e) => setDescEdit(e.target.value)}
                          />
                          <button
                            style={{
                              background: "#014848",
                              color: "#fff",
                              padding: 3,
                            }}
                            onClick={() => handleConfirmEdit(item)}
                          >
                            OK!
                          </button>
                        </>
                      )}
                    </p>
                    <div className={styles.vote}>
                      <div>
                        <LikeOutlined /> <span>{item.like}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.showMore}>
                  <MoreOutlined
                    style={{ fontSize: 20, cursor: "pointer" }}
                    onClick={() => handleShowMore(item.id)}
                  />
                  {showOptions[item.id] && (
                    <div className={styles.options}>
                      {session?.user.id !== item.user.id ? (
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => handleReport(item)}
                        >
                          <CompressOutlined style={{ color: "orange" }} />
                          &nbsp; Báo cáo vi phạm
                        </span>
                      ) : (
                        <>
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDeleteComment(item.id)}
                          >
                            <DeleteOutlined style={{ color: "red" }} /> &nbsp;
                            Xóa
                          </span>
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={() => handleEditComment(item)}
                          >
                            <EditOutlined style={{ color: "yellow" }} /> &nbsp;
                            Chỉnh sửa
                          </span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Comment;
