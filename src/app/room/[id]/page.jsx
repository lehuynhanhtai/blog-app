import ChatContainer from "@/components/Room/ChatContainer/ChatContainer";
import SideBar from "@/components/Room/SideBar/SideBar";
import styles from "./room.module.css";

const Room = ({ params }) => {
  const { id } = params;
  return (
    <div className={styles.wrapper}>
      <div className={styles.sideBar}>
        <SideBar id={id} />
      </div>
      <div className={styles.chatContainer}>
        <ChatContainer id={id} />
      </div>
    </div>
  );
};

export default Room;
