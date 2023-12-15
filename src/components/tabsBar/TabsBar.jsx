"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import styles from "./tabs.module.css";
import Image from "next/image";
import dateFormat from "dateformat";
import { EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
import { bouncy } from "ldrs";
bouncy.register();

const navTabs = [
  { id: "1", name: "Bài viết", link: "createdPosts" },
  { id: "2", name: "Series", link: "series" },
  { id: "3", name: "Đã lưu", Link: "saved" },
];

export default function TabsBar(props) {
  const searchParams = useSearchParams();
  const selectorTab = searchParams.get("tab") || "createdPosts";
  const [visible, setVisible] = useState(3);
  const [loading, setLoading] = useState(false);
  const { dataUser } = props;

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisible((prevValue) => prevValue + 3);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <section className={styles.tabHeader}>
        {navTabs.map(({ name, link, id }) => (
          <Link
            key={id}
            href={`?tab=${link}`}
            className={`${selectorTab === link ? `${styles.active}` : ""}
             ${styles.link}`}
            scroll={false}
          >
            {name}
          </Link>
        ))}
      </section>

      <div>
        <section>
          {selectorTab === "createdPosts" && (
            <>
              <div className={styles.cards}>
                {dataUser?.slice(0, visible).map((item) => (
                  <div className={styles.card} key={item.id}>
                    <Link
                      href={`/posts/${item.slug}`}
                      className={styles.cardImgContainer}
                    >
                      {item?.img && (
                        <Image
                          className={styles.cardImage}
                          src={item?.img}
                          alt=""
                          fill
                          priority={true}
                          loading="eager"
                          unoptimized={true}
                          decoding="async"
                          timeout={10000}
                        />
                      )}
                    </Link>
                    <h2 className={styles.cardTitle}>
                      <Link href={`/posts/${item.slug}`}>{item.title}</Link>
                    </h2>
                    <p className={styles.desc}>{item.desc}</p>
                    <div className={styles.cardTime}>
                      <span>{dateFormat(item.createdAt, "dd-mm-yyyy")}</span>
                      <span>
                        {item.views} <EyeOutlined />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              {loading && (
                <div className={styles.loading}>
                  <l-bouncy size="45" speed="1" color="#aaa" bg-opacity=".1" />
                </div>
              )}

              {dataUser?.length > visible && !loading && (
                <div
                  onClick={handleLoadMore}
                  disabled={loading}
                  className={styles.loadMore}
                >
                  Xem thêm
                </div>
              )}
            </>
          )}
        </section>
        <section>{selectorTab === "series" && <p>tab content 2</p>}</section>
      </div>
    </div>
  );
}
