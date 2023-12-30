"use client";
import styles from "./dashboard.module.css";
import Middleware from "./middleware";

const DashboardPage = () => {
  Middleware();
  return (
    <div className={styles.containerAdmin}>
      <div className={styles.title}>TRANG QUẢN TRỊ ỨNG DỤNG S-BLOG</div>
    </div>
  );
};

export default DashboardPage;
