import { popularPosts } from "@/utils/callAPI";
import styles from "./managePosts.module.css";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";

const ManagePosts = async () => {
  const data = await popularPosts();
  return (
    <div>
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
        <table className={styles.table}>
          <thead style={{ whiteSpace: "nowrap" }}>
            <tr style={{ textAlign: "justify" }}>
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
            {data?.map((item) => (
              <tr key={item.id} className={styles.tr}>
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

export default ManagePosts;
