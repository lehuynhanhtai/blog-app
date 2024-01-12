"use client";
import Image from "next/image";
import styles from "./messages.module.css";
import { SendOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/utils/pusher";
// import Pusher from "pusher-js";
const { TextArea } = Input;

const Messages = (params) => {
  const roomId = params.id.id;
  const { data: session } = useSession();
  const [inputMessage, setInputMessage] = useState("");
  const [incomingMessages, setIncomingMessages] = useState([]);
  const [initialMessages, setInitialMessages] = useState([]);
  const messageEndRef = useRef(null);
  const scrollTobottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/messages", {
          method: "GET",
        });

        if (res.ok) {
          const data = await res.json();
          setInitialMessages(data);
        } else {
          console.error("Failed to fetch data:", res.status, res.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

    // Pusher.logToConsole = true;
    pusherClient.subscribe(roomId);
    pusherClient.bind("incoming-message", function (data) {
      const parsedComments = JSON.parse(data.message);
      setIncomingMessages((prev) => [...prev, parsedComments]);
    });
    scrollTobottom();

    return () => {
      pusherClient.unsubscribe(roomId);
    };
  }, [roomId]);

  const filterMessage = initialMessages.filter(
    (item) => item.chatroomId === roomId
  );

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
        {filterMessage?.map((item) => (
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
              <span>{item?.user?.name}</span>
              <span>{item?.text}</span>
            </div>
          </div>
        ))}
        <div ref={messageEndRef}></div>
        {incomingMessages?.map((item, i) => (
          <div className={styles.messageUser} key={i}>
            <div className={styles.imageContainer}>
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
            </div>
            <div className={styles.inforUserMessges}>
              <span>{item?.user?.name}</span>
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
