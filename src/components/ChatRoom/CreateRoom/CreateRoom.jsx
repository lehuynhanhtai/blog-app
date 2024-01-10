"use client";
import { useRouter } from "next/navigation";
import styles from "./createRoom.module.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";

const CreateRoom = () => {
  const router = useRouter();
  const [roomName, setName] = useState("");
  const { data: session } = useSession();
  const handleCreateRoom = async () => {
    if (!roomName) {
      toast.warning("Hãy nhập tên phòng", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    const res = await fetch(`/api/room`, {
      method: "POST",
      body: JSON.stringify({
        roomName: roomName,
        userEmail: session.user.email,
      }),
    });

    if (res.status === 200) {
      alert("Tạo thành công");
      const roomId = await res.json();
      router.push(`/room/${roomId.id}`);
    }
    if (res.status !== 200) {
      toast.warning("Lỗi", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className={styles.sessionCreate}>
        <div className={styles.create}>
          <h2>Tạo Phòng</h2>
          <input
            type="text"
            id="roomName"
            name="roomName"
            placeholder="Nhập tên phòng"
            className={styles.inputCreateRoom}
            value={roomName}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className={styles.btnCreate}
            onClick={() => handleCreateRoom()}
          >
            <span>Xác nhận</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
