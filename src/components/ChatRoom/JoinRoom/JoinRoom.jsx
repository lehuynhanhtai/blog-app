"use client";
import { CodepenOutlined } from "@ant-design/icons";
import styles from "./joinRoom.module.css";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

async function checkUser() {
  const res = await fetch(`/api/members`, {
    method: "GET",
  });
  return res.json();
}

async function checkRoom() {
  const res = await fetch(`/api/room`, {
    method: "GET",
  });
  return res.json();
}

const JoinRoom = () => {
  const [idRoom, setIdRoom] = useState("");
  const { data: session } = useSession();
  const router = useRouter();
  const handleJoinRoom = async () => {
    const members = await checkUser();
    const targetUser = session.user.email;
    const userExists = members.some(
      (member) => member.userEmail === targetUser
    );
    const rooms = await checkRoom();
    const roomExists = rooms.some((room) => room.id === idRoom);

    if (userExists) {
      if (roomExists) {
        alert("Gia Nhập thành công");
        router.push(`/room/${idRoom}`);
      } else {
        toast.warning("Không tồn tại phòng chat", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      // Thực hiện các hành động khác nếu userEmail không tồn tại
      const res = await fetch(`/api/members`, {
        method: "POST",
        body: JSON.stringify({
          userEmail: session.user.email,
          roomId: idRoom,
        }),
      });
      const responseApi = await res.json();
      if (res.status !== 200) {
        toast.warning(responseApi.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      if (res.status === 200) {
        router.push(`/room/${idRoom}`);
      }
    }
  };

  return (
    <div>
      <div className={styles.join}>
        <h2>Tham gia phòng chat</h2>
        <div className={styles.joinRoom}>
          <input
            type="text"
            id="idRoom"
            name="idRoom"
            placeholder="Nhập mã phòng"
            className={styles.inputJoinRoom}
            value={idRoom}
            onChange={(e) => setIdRoom(e.target.value)}
          />
          <button className={styles.btnJoin} onClick={() => handleJoinRoom()}>
            <span>Tham gia</span>
            <CodepenOutlined style={{ fontSize: 30 }} />
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default JoinRoom;
