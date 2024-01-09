"use client";
import { findAllCategories } from "@/utils/callAPI";
import styles from "./manageCategory.module.css";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageCategory = () => {
  const [data, setData] = useState();
  const [isModal, setIsModal] = useState(false);
  const [editAction, setEditAction] = useState(false);
  const [dataEdit, setDataEdit] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await findAllCategories();
        setData(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchData();
  }, []);

  //form
  const [formData, setFormData] = useState({
    slug: "",
    name: "",
    img: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editAction) {
      const res = await fetch(`/api/categories/${dataEdit.id}`, {
        method: "PUT",
        body: JSON.stringify({ formData }),
      });
      if (res.status === 200) {
        toast.success("Sửa danh mục thành công!!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        setIsModal(false);
        window.location.reload();
      }
    } else {
      const res = await fetch("/api/categories", {
        method: "POST",
        body: JSON.stringify({ formData }),
      });
      if (res.status === 200) {
        toast.success("Thêm danh mục thành công!!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setFormData({
          slug: "",
          name: "",
          img: "",
        });
        setIsModal(false);
        window.location.reload();
      }
    }
  };

  const handleAddCategory = () => {
    setIsModal(true);
  };

  const handleDelete = async (id) => {
    const res = await fetch(`/api/categories/${id}`, {
      method: "DELETE",
    });
    if (res.status === 200) {
      toast.success("Xóa danh mục thành công!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      window.location.reload();
    }
    if (res.status !== 200) {
      toast.error("Xóa danh mục thất bại!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleEdit = async (item) => {
    setDataEdit(item);
    setFormData({
      slug: item.slug,
      name: item.name,
      img: item.img || "",
    });
    setEditAction(true);
    setIsModal(true);
  };

  const handleClose = () => {
    setEditAction(false);
    setIsModal(false);
    setFormData({
      slug: "",
      name: "",
      img: "",
    });
  };

  return (
    <div>
      <ToastContainer />
      <div className={styles.header}>
        <div>
          <h2>Danh sách danh mục</h2>
          <p>Quản lý danh mục của S-BLOG</p>
        </div>
        <button className={styles.addBtn} onClick={handleAddCategory}>
          <PlusOutlined />
          <b>Thêm danh mục</b>
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <table className={styles.table}>
          <thead>
            <tr style={{ textAlign: "justify" }}>
              <th className={styles.th}>STT</th>
              <th className={styles.th}>Tên không dấu</th>
              <th className={styles.th}>Tên danh mục</th>
              <th className={styles.th}>Hình ảnh</th>
              <th className={styles.th}>Bài viết</th>
              <th className={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={item.id}>
                <td className={styles.td}>{index + 1}</td>
                <td className={styles.td}>{item.slug}</td>
                <td className={styles.td}>{item.name}</td>
                <td className={styles.td}>{item.img || "null"}</td>
                <td className={styles.td}>{item.posts.length}</td>
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
              <tr>
                <td className={styles.td}></td>
                <td className={styles.td}>
                  <input
                    type="text"
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                  />
                </td>
                <td className={styles.td}>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </td>
                <td className={styles.td}>
                  <input
                    type="text"
                    id="img"
                    name="img"
                    value={formData.img}
                    onChange={handleChange}
                  />
                </td>
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
  );
};

export default ManageCategory;
