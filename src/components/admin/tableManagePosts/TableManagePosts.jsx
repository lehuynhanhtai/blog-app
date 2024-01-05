"use client";
import useSWR from "swr";
import styles from "./tableManagePosts.module.css";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useState } from "react";
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

const TableManagePosts = () => {
  const { data, mutate, isLoading } = useSWR("/api/popularposts", fetcher);
  const [isModal, setIsModal] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    desc: "",
    img: "",
    catSlug: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/popularposts/${dataEdit.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formData,
      }),
    });
    if (res.status === 200) {
      toast.success("Sửa bài viết thành công!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      mutate();
      setIsModal(false);
      return;
    }
    if (res.status !== 200) {
      toast.warning("Sửa bài viết không thành công!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
  };

  const handleEdit = (item) => {
    setDataEdit(item);
    setIsModal(true);
    setFormData({
      slug: item.slug,
      title: item.title,
      desc: item.desc,
      img: item.img,
      catSlug: item.catSlug,
    });
  };

  const handleClose = () => {
    setFormData({
      slug: "",
      title: "",
      desc: "",
      img: "",
      catSlug: "",
    });
    setIsModal(false);
  };

  const handleDelete = async (id) => {
    const res = await fetch(`/api/popularposts/${id}`, {
      method: "DELETE",
    });
    if (res.status === 200) {
      toast.success("Xóa bài viết thành công!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      mutate();
    }
    if (res.status !== 200) {
      toast.warning("Xóa bài viết không thành công!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className={styles.header}>
        <div>
          <h2>Danh sách bài viết</h2>
          <p>Quản lý bài viết của S-BLOG</p>
        </div>
        <button className={styles.addBtn}>
          <PlusOutlined />
          <b>Thêm bài viết</b>
        </button>
      </div>
      <div className={styles.wrapper}>
        <form onSubmit={handleSubmit}>
          <table className={styles.table}>
            <thead style={{ whiteSpace: "nowrap" }}>
              <tr style={{ textAlign: "justify" }}>
                <th className={styles.th}>STT</th>
                <th className={styles.th}>Tiêu đề không dấu</th>
                <th className={styles.th}>Tiêu đề</th>
                <th className={styles.th}>Nội dung</th>
                <th className={styles.th}>Hình ảnh</th>
                <th className={styles.th}>Lượt xem</th>
                <th className={styles.th}>Votes</th>
                <th className={styles.th}>Danh mục không dấu</th>
                <th className={styles.th}>Tác giả</th>
                <th className={styles.th}>Bình luận</th>
                <th className={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => (
                <tr key={item.id} className={styles.tr}>
                  <td className={styles.td}>{index + 1}</td>
                  <td className={styles.td}>{item.slug}</td>
                  <td className={styles.tdTitle}>{item.title}</td>
                  <td className={styles.tdContent}>{item.desc}</td>
                  <td className={styles.td}>{item.img}</td>
                  <td className={styles.td}>{item.views}</td>
                  <td className={styles.td}>{item.votes}</td>
                  <td className={styles.td}>{item.catSlug}</td>
                  <td className={styles.td}>{item.userEmail}</td>
                  <td className={styles.td}>{item.comments.length}</td>
                  <td className={styles.td}>
                    <div style={{ display: "flex", gap: 20 }}>
                      <EditOutlined
                        className={styles.actionsBtnEdit}
                        onClick={() => handleEdit(item)}
                      />
                      <DeleteOutlined
                        className={styles.actionsBtnDelete}
                        onClick={() => handleDelete(item.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
              {isModal && (
                <tr className={styles.tr}>
                  <td className={styles.td}></td>
                  <td className={styles.td}>
                    <input
                      type="text"
                      id="slug"
                      name="slug"
                      value={formData.slug}
                      onChange={handleOnChange}
                    />
                  </td>
                  <td className={styles.tdTitle}>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleOnChange}
                    />
                  </td>
                  <td className={styles.tdContent}></td>
                  <td className={styles.td}>
                    <input
                      type="text"
                      id="img"
                      name="img"
                      value={formData.img}
                      onChange={handleOnChange}
                    />
                  </td>
                  <td className={styles.td}></td>
                  <td className={styles.td}></td>
                  <td className={styles.td}>
                    <input
                      type="text"
                      id="catSlug"
                      name="catSlug"
                      value={formData.catSlug}
                      onChange={handleOnChange}
                    />
                  </td>
                  <td className={styles.td}></td>
                  <td className={styles.td}></td>
                  <td className={styles.td}>
                    <button
                      className={styles.buttonClose}
                      onClick={() => handleClose()}
                    >
                      <CloseOutlined />
                    </button>
                    <button className={styles.buttonAdd} type="submit">
                      <CheckOutlined />
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default TableManagePosts;
