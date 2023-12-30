import React from "react";
import styles from "./dashboard.module.css";
import MenuSideBar from "@/components/admin/menuSideBar/MenuSideBar";

const DashboardLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <MenuSideBar />
      <div style={{ width: "100%" }}>{children}</div>
    </div>
  );
};

export default DashboardLayout;
