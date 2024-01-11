"use client";
import { CodepenOutlined } from "@ant-design/icons";
import styles from "./joinRoom.module.css";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

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
    const rooms = await checkRoom();
    const room = rooms.find((room) => room.id === idRoom);

    if (room) {
      const userExistsInRoom = room.members.some(
        (member) => member.userEmail === session.user.email
      );

      if (userExistsInRoom) {
        alert("Gia Nhập thành công");
        router.push(`/room/${idRoom}`);
      } else {
        // Gọi API để thêm mới thành viên và chuyển hướng nếu thành công
        try {
          const res = await fetch(`/api/members`, {
            method: "POST",
            body: JSON.stringify({
              userEmail: session.user.email,
              roomId: idRoom,
            }),
          });

          if (res.status === 200) {
            alert("Gia Nhập thành công");
            router.push(`/room/${idRoom}`);
          } else {
            const responseApi = await res.json();
            toast.warning(responseApi.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        } catch (error) {
          console.error("Error joining room:", error);
          toast.error("Có lỗi xảy ra khi gia nhập phòng", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    } else {
      toast.warning("Không tồn tại phòng chat", {
        position: toast.POSITION.TOP_RIGHT,
      });
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
