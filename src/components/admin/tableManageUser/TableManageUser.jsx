"use client";
import styles from "./tableManageUser.module.css";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useState } from "react";
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

const TableManageUser = () => {
  const { data, mutate, isLoading } = useSWR(`/api/users`, fetcher);
  const [isModal, setIsModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    slogan: "",
    email: "",
    password: "",
    image: "",
    backgroundUser: "",
    birthDay: "",
    sex: "",
  });
  const [dataEdit, setDataEdit] = useState({});
  const [editAction, setEditAction] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editAction) {
      const res = await fetch(`/api/users/${dataEdit.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });
      if (res.status === 200) {
        toast.success("Sửa người dùng thành công!!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setEditAction(false);
        setIsModal(false);
        setFormData({
          name: "",
          role: "",
          slogan: "",
          email: "",
          password: "",
          image: "",
          backgroundUser: "",
          birthDay: "",
          sex: "",
        });
        mutate();
      }
    } else {
      if (!formData.email || !formData.password || !formData.name) {
        toast.warning("Email, password or name không được để rỗng", {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }

      const res = await fetch(`/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });

      if (res.status === 200) {
        toast.success("Thêm người dùng thành công!!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setFormData({
          name: "",
          role: "",
          slogan: "",
          email: "",
          password: "",
          image: "",
          backgroundUser: "",
        });
        setIsModal(false);

        mutate();
      }
    }
  };

  const handleAdd = () => {
    setIsModal(true);
  };

  const handleClose = () => {
    setIsModal(false);
    setEditAction(false);
    setFormData({
      name: "",
      role: "",
      slogan: "",
      email: "",
      password: "",
      image: "",
      backgroundUser: "",
    });
  };

  const handleDelete = async (id) => {
    const res = await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });

    if (res.status === 200) {
      toast.success("Xóa người dùng thành công!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      mutate();
    }
    if (res.status !== 200) {
      toast.error("Xóa người dùng thất bại!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleEdit = async (item) => {
    setDataEdit(item);
    setFormData({
      name: item.name,
      role: item.role,
      slogan: item.slogan || "",
      email: item.email,
      password: item.password || "",
      image: item.image || "",
      backgroundUser: item.backgroundUser || "",
      birthDay: item.birthDay || "",
      sex: item.sex || "",
    });
    setEditAction(true);
    setIsModal(true);
  };

  return (
    <div>
      <ToastContainer />
      <div className={styles.header}>
        <div>
          <h2>Danh sách người dùng</h2>
          <p>Quản lý người dùng của S-BLOG</p>
        </div>
        <button className={styles.addBtn} onClick={handleAdd}>
          <PlusOutlined />
          <b>Thêm người dùng</b>
        </button>
      </div>
      <div className={styles.wrapper}>
        <form onSubmit={handleSubmit}>
          <table className={styles.table}>
            <thead style={{ whiteSpace: "nowrap" }}>
              <tr style={{ textAlign: "justify" }}>
                <th className={styles.th}>STT</th>
                <th className={styles.th}>Tên người dùng</th>
                <th className={styles.th}>Role</th>
                <th className={styles.th}>Slogan</th>
                <th className={styles.th}>Tên tài khoản</th>
                <th className={styles.th}>Mật khẩu</th>
                <th className={styles.th}>Avatar</th>
                <th className={styles.th}>Hình nền</th>
                <th className={styles.th}>Ngày sinh</th>
                <th className={styles.th}>Giới tính</th>
                <th className={styles.th}>Bài viết</th>
                <th className={styles.th}>Bình luận</th>
                <th className={styles.th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {data?.map((item, index) => (
                <tr key={item.id}>
                  <td className={styles.td}>{index + 1}</td>
                  <td className={styles.td}>{item.name}</td>
                  <td className={styles.td}>{item.role}</td>
                  <td className={styles.td}>{item.slogan || "null"}</td>
                  <td className={styles.td}>{item.email}</td>
                  <td className={styles.td}>{item.password || "null"}</td>
                  <td className={styles.td}>{item.image || "null"}</td>
                  <td className={styles.td}>{item.backgroundUser || "null"}</td>
                  <td className={styles.td}>{item.birthDay || "null"}</td>
                  <td className={styles.td}>{item.sex || "null"}</td>
                  <td className={styles.td}>{item.post.length}</td>
                  <td className={styles.td}>{item.comment.length}</td>
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
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleOnChange}
                    />
                  </td>
                  <td className={styles.td}>
                    <input
                      type="text"
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleOnChange}
                    />
                  </td>
                  <td className={styles.td}>
                    <input
                      type="text"
                      id="slogan"
                      name="slogan"
                      value={formData.slogan}
                      onChange={handleOnChange}
                    />
                  </td>
                  <td className={styles.td}>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleOnChange}
                    />
                  </td>
                  <td className={styles.td}>
                    <input
                      type="text"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleOnChange}
                    />
                  </td>
                  <td className={styles.td}>
                    <input
                      type="text"
                      id="image"
                      name="image"
                      value={formData.image}
                      onChange={handleOnChange}
                    />
                  </td>
                  <td className={styles.td}>
                    <input
                      type="text"
                      id="backgroundUser"
                      name="backgroundUser"
                      value={formData.backgroundUser}
                      onChange={handleOnChange}
                    />
                  </td>
                  <td className={styles.td}>
                    <input
                      type="text"
                      id="birthDay"
                      name="birthDay"
                      value={formData.birthDay}
                      onChange={handleOnChange}
                    />
                  </td>
                  <td className={styles.td}>
                    <input
                      type="text"
                      id="sex"
                      name="sex"
                      value={formData.sex}
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

export default TableManageUser;
