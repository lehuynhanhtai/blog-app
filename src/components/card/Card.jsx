import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";

const Card = () => {
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.imageContainer}>
        <Image
          src="/p1.jpeg"
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
          priority={true}
          className={styles.image}
        />
      </Link>
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>11.2.2202 - </span>
          <span className={styles.category}>CULTURE</span>
        </div>

        <Link href="/">
          <h2>Tại sao nên sử dụng Next.js?</h2>
        </Link>
        <p className={styles.desc}>
          Next.js là một open-source React front-end framework được bổ sung các
          tính năng như Server Side Rendering (SSR) và Static Site Generation
          (SSG). Next.js được xây dựng dựa trên thư viện React có nghĩa là
          Next.js lấy những lợi thế của React và bổ sung các tính năng. Next.js
          là một open-source React front-end framework được bổ sung các tính
          năng như Server Side Rendering (SSR) và Static Site Generation (SSG).
          Next.js được xây dựng dựa trên thư viện React có nghĩa là Next.js lấy
          những lợi thế của React và bổ sung các tính năng.
        </p>
        <Link href="/" className={styles.link}>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Card;
