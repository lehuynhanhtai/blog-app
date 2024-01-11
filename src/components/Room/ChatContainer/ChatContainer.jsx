import { BorderlessTableOutlined } from "@ant-design/icons";
import MessageInput from "../MessageInput/MessageInput";
import Messages from "../Messages/Messages";
import styles from "./chatContainer.module.css";

const ChatContainer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.idRoom}>
        {" "}
        123544asdasd <BorderlessTableOutlined />
      </div>
      <div className={styles.wrapper}>
        <Messages />
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
