import CreateRoom from "@/components/ChatRoom/CreateRoom/CreateRoom";
import JoinRoom from "@/components/ChatRoom/JoinRoom/JoinRoom";
import styles from "./chat.module.css";
import { CodepenOutlined } from "@ant-design/icons";

const Chat = () => {
  return (
    <div>
      <div className={styles.join}>
        <h2>Tham gia phòng chat</h2>
        <div className={styles.joinRoom}>
          <input
            type="text"
            id="idName"
            name="idName"
            placeholder="Nhập mã phòng"
            className={styles.inputJoinRoom}
          />
          <button className={styles.btnJoin}>
            <span>Tham gia</span>
            <CodepenOutlined style={{ fontSize: 30 }} />
          </button>
        </div>
      </div>
      <CreateRoom />
    </div>
  );
};

export default Chat;
