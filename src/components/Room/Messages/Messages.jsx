"use client";
import Image from "next/image";
import styles from "./messages.module.css";
import useSWR from "swr";
import { SendOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useState } from "react";
import { useSession } from "next-auth/react";
const { TextArea } = Input;

const fetcher = async (url) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }

  return data;
};

const Messages = (params) => {
  const { data, mutate, isLoading } = useSWR(`/api/messages`, fetcher);
  const filterRoom = data?.filter((item) => item.chatroomId === params.id.id);
  const { data: session } = useSession();
  const [inputMessage, setInputMessage] = useState("");

  const handleInput = async () => {
    if (!inputMessage) {
      alert("Nhập tin nhắn");
      return;
    }
    const res = await fetch(`/api/messages`, {
      method: "POST",
      body: JSON.stringify({
        text: inputMessage,
        chatroomId: params.id.id,
        userEmail: session.user.email,
      }),
    });

    if (res.status === 200) {
      setInputMessage("");
      mutate();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleInput();
    }
  };

  return (
    <div>
      <div className={styles.containerMessages}>
        {filterRoom?.map((item) => (
          <div className={styles.messageUser} key={item.id}>
            <div className={styles.imageContainer}>
              {item?.user?.image && (
                <Image
                  src={item?.user?.image}
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
            </div>
            <div className={styles.inforUserMessges}>
              <b>
                <span>{item?.user?.name}</span>
              </b>
              <span>{item?.text}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.messageInput}>
        <TextArea
          rows={4}
          className={styles.input}
          style={{ resize: "none" }}
          value={inputMessage}
          onKeyDown={handleKeyDown}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <SendOutlined className={styles.icon} onClick={() => handleInput()} />
      </div>
    </div>
  );
};

export default Messages;
