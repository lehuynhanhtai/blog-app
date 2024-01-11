import Image from "next/image";
import styles from "./messages.module.css";

const Messages = () => {
  return (
    <div className={styles.container}>
      <div className={styles.messageUser}>
        <div className={styles.imageContainer}>
          <Image
            src="/p1.jpeg"
            alt=""
            priority={true}
            fill
            className={styles.image}
            loading="eager"
            unoptimized={true}
            decoding="async"
            timeout={10000}
          />
        </div>
        <div className={styles.inforLeader}>
          <span>Tên phòng: </span>
        </div>
      </div>
    </div>
  );
};

export default Messages;
