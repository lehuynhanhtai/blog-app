import Image from "next/image";
import styles from "./aboutPage.module.css";

const About = () => {
  return (
    <div>
      <div className={styles.about_header}>
        <div className={styles.content}>
          <h3 className={styles.title}>S-BLOG</h3>
          <p className={styles.slogan}>
            Mạng xã hội chia sẻ quan điểm - kiến thức của bạn
          </p>
          <p className={styles.content1}>
            Được thành lập vào 2016, từ một mạng xã hội chia sẻ quan điểm, kiến
            thức và thảo luận, S-BLOG đã phát triển một hệ sinh thái lớn mạnh,
            đa nền tảng, với mục tiêu hỗ trợ và kết nối các cá nhân/nhóm tri
            thức trong xã hội.
          </p>
          <p className={styles.content1}>
            Với kinh nghiệm 7 năm xây dựng cộng đồng, S-BLOG Media tự tin là cầu
            nối vững chắc cho các tổ chức/doanh nghiệp và thế hệ trẻ.
          </p>
        </div>
        <div className={styles.imgContainer}>
          <Image
            src="/book1.jpg"
            alt=""
            priority={true}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
            className={styles.img}
          />
        </div>
      </div>
      <div className={styles.about_midle}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 45, fontWeight: 700 }}>S-BLOG Network</p>
          <span style={{ fontSize: 70, fontWeight: 700 }}>10</span>
          <span style={{ fontSize: 30, fontWeight: 500 }}> Tr</span>
          <p style={{ fontSize: 25, fontWeight: 600 }}>NGƯỜI TRẺ ĐÃ TIẾP CẬN</p>
          <p style={{ fontWeight: 500, color: "#3398D4" }}>
            Là người Việt trẻ trong độ tuổi 18 - 35
          </p>
        </div>
        <div className={styles.about_midle_content}>
          <div className={styles.about_midle_child}>
            <p style={{ fontSize: 17, fontWeight: 700 }}>Website</p>
            <p style={{ fontSize: 40, fontWeight: 700 }}>2Tr</p>
            <p style={{ color: "#3398D4", fontWeight: 700 }}>
              LƯỢT XEM HÀNG THÁNG
            </p>
          </div>
          <div className={styles.about_midle_child}>
            <p style={{ fontSize: 17, fontWeight: 700 }}>Youtube</p>
            <p style={{ fontSize: 40, fontWeight: 700 }}>100Tr</p>
            <p style={{ color: "#3398D4", fontWeight: 700 }}>LƯỢT HIỂN THỊ</p>
          </div>
          <div className={styles.about_midle_child}>
            <p style={{ fontSize: 17, fontWeight: 700 }}>Facebook</p>
            <p style={{ fontSize: 40, fontWeight: 700 }}>10Tr</p>
            <p style={{ color: "#3398D4", fontWeight: 700 }}>LƯỢT HIỂN THỊ</p>
          </div>
        </div>
      </div>
      <div className={styles.about_bottom}></div>
    </div>
  );
};

export default About;
