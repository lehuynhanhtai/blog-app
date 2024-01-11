import ChatContainer from "@/components/Room/ChatContainer/ChatContainer";
import SideBar from "@/components/Room/SideBar/SideBar";
import styles from "./room.module.css";

const Room = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.sideBar}>
        <SideBar />
      </div>
      <div className={styles.chatContainer}>
        <ChatContainer />
      </div>
    </div>
  );
};

export default Room;
