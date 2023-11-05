"use client";
import { UpCircleOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";

export default function BackToTop() {
  const [backToTop, setBachToTop] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 800) {
        setBachToTop(true);
      } else {
        setBachToTop(false);
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {backToTop && (
        <UpCircleOutlined
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            height: "50px",
            width: "50px",
            fontSize: "50px",
          }}
          onClick={scrollToTop}
        ></UpCircleOutlined>
      )}
    </div>
  );
}
