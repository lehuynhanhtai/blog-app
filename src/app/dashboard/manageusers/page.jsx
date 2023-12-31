import { getAllUser } from "@/utils/callAPI";
import styles from "./manageUsers.module.css";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";

const ManageUser = async () => {
  const data = await getAllUser();
  return (
    <div>
      <div className={styles.header}>
        <div>
          <h2>Danh sách người dùng</h2>
          <p>Quản lý người dùng của S-BLOG</p>
        </div>
        <button className={styles.addBtn}>
          <PlusOutlined />
          <b>Thêm người dùng</b>
        </button>
      </div>
      <div className={styles.wrapper}>
        <table className={styles.table}>
          <thead style={{ whiteSpace: "nowrap" }}>
            <tr style={{ textAlign: "justify" }}>
              <th className={styles.th}>Tên người dùng</th>
              <th className={styles.th}>Role</th>
              <th className={styles.th}>Slogan</th>
              <th className={styles.th}>Tên tài khoản</th>
              <th className={styles.th}>Mật khẩu</th>
              <th className={styles.th}>Avatar</th>
              <th className={styles.th}>Hình nền</th>
              <th className={styles.th}>Bài viết</th>
              <th className={styles.th}>Bình luận</th>
              <th className={styles.th}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((item) => (
              <tr key={item.id}>
                <td className={styles.td}>{item.name}</td>
                <td className={styles.td}>{item.role}</td>
                <td className={styles.td}>{item.slogan || "null"}</td>
                <td className={styles.td}>{item.email}</td>
                <td className={styles.td}>{item.password || "null"}</td>
                <td className={styles.td}>{item.image}</td>
                <td className={styles.td}>{item.backgroundUser || "null"}</td>
                <td className={styles.td}>{item.post.length}</td>
                <td className={styles.td}>{item.comment.length}</td>
                <td className={styles.td}>
                  <div style={{ display: "flex", gap: 20 }}>
                    <EditOutlined className={styles.actionsBtnEdit} />
                    <DeleteOutlined className={styles.actionsBtnDelete} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
