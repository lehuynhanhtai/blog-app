"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./listRoom.module.css";
import { useSession } from "next-auth/react";

const ListRoom = () => {
  const { data: session } = useSession();
  const chatRoom = session?.user.chatRoom;

  return (
    <div className={styles.wrapper}>
      {chatRoom?.map((item) => (
        <div className={styles.room} key={item.id}>
          <Link href={`/room/${item.id}`} className={styles.imageContainer}>
            {item?.img && (
              <Image
                src={item?.img}
                alt=""
                priority={true}
                fill
                className={styles.image}
                loading="eager"
                unoptimized={true}
                decoding="async"
                timeout={10000}
              />
            )}
          </Link>
          <div className={styles.inforRoom}>
            <span>Tên phòng: {item?.roomName}</span>
            <span>Mã phòng: {item?.id} </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListRoom;
