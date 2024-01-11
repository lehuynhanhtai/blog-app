import Link from "next/link";
import styles from "./sideBar.module.css";
import Image from "next/image";

const SideBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sessionLeader}>
        <h3 style={{ textAlign: "center" }}>Ten phong</h3>
        <div className={styles.leader}>
          <Link href={``} className={styles.imageContainer}>
            <Image
              src="/p1.jpeg"
              alt=""
              priority={true}
              fill
              className={styles.image}
              loading="eager"
              unoptimized={true}
              decoding="async"
              timeout={10000}
            />
          </Link>
          <div className={styles.inforLeader}>
            <span>Tên phòng: </span>
            <span>Mã phòng: </span>
          </div>
        </div>
      </div>
      <div className={styles.sessionMember}>
        <h3>Thành viên</h3>
        <div className={styles.leader}>
          <Link href={``} className={styles.imageContainer}>
            <Image
              src="/p1.jpeg"
              alt=""
              priority={true}
              fill
              className={styles.image}
              loading="eager"
              unoptimized={true}
              decoding="async"
              timeout={10000}
            />
          </Link>
          <div className={styles.inforLeader}>
            <span>Tên phòng: </span>
            <span>Mã phòng: </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
