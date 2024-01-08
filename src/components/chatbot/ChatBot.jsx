"use state";
import React, { useEffect, useRef, useState } from "react";
import styles from "./chatBot.module.css";
import {
  AliwangwangOutlined,
  RobotOutlined,
  SendOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useChat } from "ai/react";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chatbot",
  });
  const messageEndRef = useRef(null);
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleOpenBot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && (
        <div className={styles.chatbotContainer}>
          <div className={styles.messageContainer}>
            {messages.length !== 0 ? (
              <div>
                {messages.map((message) => (
                  <div key={message.id}>
                    {message.role === "user" ? (
                      <div className={styles.userMessage}>
                        <p>{message.content}</p>
                        <UserOutlined />
                      </div>
                    ) : (
                      <div className={styles.botMessage}>
                        <RobotOutlined />
                        <p>{message.content}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div>Vui lòng đặt câu hỏi </div>
            )}
            <div ref={messageEndRef}></div>
          </div>

          <form onSubmit={handleSubmit} className={styles.inputContainer}>
            <textarea
              placeholder="Hãy viết một câu hỏi..."
              className={styles.inputBox}
              style={{ resize: "none" }}
              value={input}
              onChange={handleInputChange}
            />
            <button className={styles.sendButton} type="submit">
              <SendOutlined />
            </button>
          </form>
        </div>
      )}

      <div className={styles.buttonOpen} onClick={handleOpenBot}>
        <AliwangwangOutlined />
      </div>
    </>
  );
};

export default ChatBot;
