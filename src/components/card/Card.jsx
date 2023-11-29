import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";

const Card = ({ item }) => {
  return (
    <div className={styles.container}>
      <Link href={`/posts/${item.slug}`} className={styles.imageContainer}>
        <Image
          src={item.img}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
          priority={true}
          className={styles.image}
        />
      </Link>
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>
            {item.createdAt.substring(0, 10)} -{" "}
          </span>
          <Link href={`/blog?cat=${item.catSlug}`} className={styles.category}>
            {item.cateTitle}
          </Link>
        </div>

        <Link href={`/posts/${item.slug}`}>
          <h2>{item.title}</h2>
        </Link>
        <p className={styles.desc}>{item.desc}</p>
        <Link href={`/posts/${item.slug}`} className={styles.link}>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Card;
