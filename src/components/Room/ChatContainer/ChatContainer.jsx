import { BorderlessTableOutlined } from "@ant-design/icons";
import Messages from "../Messages/Messages";
import styles from "./chatContainer.module.css";

const ChatContainer = (id) => {
  return (
    <div className={styles.container}>
      <div className={styles.idRoom}>
        {" "}
        {id.id} <BorderlessTableOutlined />
      </div>
      <Messages id={id} />
    </div>
  );
};

export default ChatContainer;
