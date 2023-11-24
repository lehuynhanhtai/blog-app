import Image from "next/image";
import styles from "./contactPage.module.css";

const Contact = () => {
  return (
    <div className={styles.container}>
      <form action="" className={styles.form}>
        <h2>Liên Hệ</h2>
        <label htmlFor="" className={styles.label}>
          Họ tên:
        </label>
        <input type="text" className={styles.input} />
        <label htmlFor="" className={styles.label}>
          Số điện thoại:
        </label>
        <input type="text" className={styles.input} />
        <label htmlFor="" className={styles.label}>
          Email:
        </label>
        <input type="text" className={styles.input} />
        <label htmlFor="" className={styles.label}>
          Gói dịch vụ quan tâm
        </label>
        <input type="text" className={styles.input} />
        <label htmlFor="" className={styles.label}>
          Công ty/Tổ chức
        </label>
        <input type="text" className={styles.input} />

        <button className={styles.button}>Gửi thông tin</button>
      </form>

      <div className={styles.imgContainer}>
        <Image
          src="/p1.jpeg"
          priority={true}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
          alt=""
          className={styles.img}
        />
      </div>
    </div>
  );
};

export default Contact;
