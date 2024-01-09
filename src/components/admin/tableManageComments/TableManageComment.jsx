"use client";

import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import styles from "./manageComment.module.css";
import useSWR from "swr";
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

const TableManageComment = () => {
  const { data, mutate, isLoading } = useSWR(`/api/comments`, fetcher);

  const handleSubmit = () => {};
  const handleAdd = () => {};
  const handleEdit = () => {};
  const handleDelete = async (id) => {
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
      toast.warning("Đã xảy ra lỗi vui lòng thử lại!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className={styles.header}>
        <div>
          <h2>Danh sách bình luận</h2>
          <p>Quản lý bình luận của S-BLOG</p>
        </div>
        <button className={styles.addBtn} onClick={handleAdd}>
          <PlusOutlined />
          <b>Thêm bình luận</b>
        </button>
      </div>
      <div className={styles.wrapper}>
        <form onSubmit={handleSubmit}>
          <table className={styles.table}>
            <thead style={{ whiteSpace: "nowrap" }}>
              <tr style={{ textAlign: "justify" }}>
                <th className={styles.th}>STT</th>
                <th className={styles.th}>Nội dung</th>
                <th className={styles.th}>Báo cáo</th>
                <th className={styles.th}>Lượt like</th>
                <th className={styles.th}>Người bình luận</th>
                <th className={styles.th}>Bài viết</th>
                <th className={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => (
                <tr
                  key={item.id}
                  className={`${item.report !== null ? styles.redText : ""}`}
                >
                  <td className={styles.td}>{index + 1}</td>
                  <td className={styles.td}>{item.desc}</td>
                  <td className={styles.td}>{item.report || "null"}</td>
                  <td className={styles.td}>{item.like}</td>
                  <td className={styles.td}>{item.userEmail}</td>
                  <td className={styles.td}>{item.post.title}</td>
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
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default TableManageComment;
