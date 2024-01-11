import CreateRoom from "@/components/ChatRoom/CreateRoom/CreateRoom";
import JoinRoom from "@/components/ChatRoom/JoinRoom/JoinRoom";
import styles from "./chat.module.css";
import { CodepenOutlined } from "@ant-design/icons";
import ListRoom from "@/components/ChatRoom/ListRoom/ListRoom";

const Chat = () => {
  return (
    <div>
      <JoinRoom />
      <CreateRoom />
      <div className={styles.listRoom}>
        <ListRoom />
      </div>
    </div>
  );
};

export default Chat;
