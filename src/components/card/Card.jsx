import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";
import { HeatMapOutlined, MessageOutlined } from "@ant-design/icons";
import dateFormat from "dateformat";

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
          loading="eager"
          unoptimized={true}
          decoding="async"
          timeout={10000}
        />
      </Link>
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>
            {dateFormat(item.createdAt, "dd-mm-yyyy")} -{" "}
          </span>
          <Link href={`/blog?cat=${item.catSlug}`} className={styles.category}>
            {item.cat.name}
          </Link>
        </div>

        <Link href={`/posts/${item.slug}`}>
          <h2>{item.title}</h2>
        </Link>
        <p
          className={styles.desc}
          dangerouslySetInnerHTML={{ __html: item.desc }}
        ></p>
        <div className={styles.author}>
          <div className={styles.user}>
            <Link
              href={`user/${item.user.id}`}
              rel="preload"
              className={styles.avatarContainer}
            >
              {item?.user.image && (
                <Image
                  src={item?.user?.image}
                  alt=""
                  priority={true}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                  className={styles.avatar}
                  loading="eager"
                  unoptimized={true}
                  decoding="async"
                  timeout={10000}
                />
              )}
            </Link>
            <p style={{ fontWeight: 700 }}>{item.user.name}</p>
          </div>

          <div className={styles.itemEnd}>
            <div className={styles.icon}>
              <HeatMapOutlined className={styles.item} />
              <span>12k1</span>
            </div>
            <div className={styles.icon}>
              <MessageOutlined className={styles.item} />
              <span>12k1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
