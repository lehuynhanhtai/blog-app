import { findAllCategories } from "@/utils/callAPI";
import styles from "./manageCategory.module.css";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";

const ManageCategory = async () => {
  const data = await findAllCategories();
  return (
    <div>
      <div className={styles.header}>
        <div>
          <h2>Danh sách danh mục</h2>
          <p>Quản lý danh mục của S-BLOG</p>
        </div>
        <button className={styles.addBtn}>
          <PlusOutlined />
          <b>Thêm danh mục</b>
        </button>
      </div>
      <table className={styles.table}>
        <thead>
          <tr style={{ textAlign: "justify" }}>
            <th className={styles.th}>Tên không dấu</th>
            <th className={styles.th}>Tên danh mục</th>
            <th className={styles.th}>Hình ảnh</th>
            <th className={styles.th}>Bài viết</th>
            <th className={styles.th}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((item) => (
            <tr key={item.id}>
              <td className={styles.td}>{item.slug}</td>
              <td className={styles.td}>{item.name}</td>
              <td className={styles.td}>{item.img || "null"}</td>
              <td className={styles.td}>{item.posts.length}</td>
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
  );
};

export default ManageCategory;
