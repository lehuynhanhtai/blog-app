"use client";
import { SendOutlined } from "@ant-design/icons";
import styles from "./messageInput.module.css";
import { Input } from "antd";
const { TextArea } = Input;

const MessageInput = () => {
  return (
    <div className={styles.container}>
      <TextArea rows={4} className={styles.input} style={{ resize: "none" }} />
      <SendOutlined className={styles.icon} />
    </div>
  );
};

export default MessageInput;
