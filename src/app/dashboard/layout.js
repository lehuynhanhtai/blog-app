import React from "react";
import styles from "./dashboard.module.css";

const DashboardLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <div>Menu side bar</div>
      <div>{children}</div>
    </div>
  );
};

export default DashboardLayout;
