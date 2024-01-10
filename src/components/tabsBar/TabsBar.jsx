"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import styles from "./tabs.module.css";
import Image from "next/image";
import dateFormat from "dateformat";
import { DeleteOutlined, EyeOutlined, MoreOutlined } from "@ant-design/icons";
import { useState } from "react";
import { bouncy } from "ldrs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
bouncy.register();

const navTabs = [
  { id: "1", name: "Bài viết", link: "createdPosts" },
  { id: "2", name: "Series", link: "series" },
];

export default function TabsBar(props) {
  const searchParams = useSearchParams();
  const selectorTab = searchParams.get("tab") || "createdPosts";
  const [visible, setVisible] = useState(3);
  const [loading, setLoading] = useState(false);
  const [optionsCard, setOptionCard] = useState(false);
  const { data: session } = useSession();
  const { dataUser, id } = props;

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisible((prevValue) => prevValue + 3);
      setLoading(false);
    }, 2000);
  };
  const handleOptions = (item) => {
    setOptionCard((prevOptions) => ({
      ...prevOptions,
      [item.id]: !prevOptions[item.id],
    }));
  };
  const handleDeleteCard = async (item) => {
    const res = await fetch(`/api/popularposts/${item.id}`, {
      method: "DELETE",
    });
    if (res.status === 200) {
      toast.success("Xóa thành công", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setOptionCard(!optionsCard);
      return;
    }
    if (res.status !== 200) {
      toast.warning("Có lỗi xãy ra vui lòng thử lại", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
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
                {dataUser?.post?.slice(0, visible).map((item) => (
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
                    {session?.user.id !== id ? (
                      <></>
                    ) : (
                      <div className={styles.action}>
                        <MoreOutlined onClick={() => handleOptions(item)} />
                        {optionsCard[item.id] && (
                          <div
                            className={styles.options}
                            onClick={() => handleDeleteCard(item)}
                          >
                            <DeleteOutlined style={{ color: "red" }} />
                            <span>Xóa bài viết</span>
                          </div>
                        )}
                      </div>
                    )}

                    <h2 className={styles.cardTitle}>
                      <Link href={`/posts/${item.slug}`}>{item.title}</Link>
                    </h2>
                    <p
                      className={styles.desc}
                      dangerouslySetInnerHTML={{ __html: item.desc }}
                    ></p>
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

              {dataUser?.post?.length > visible && !loading && (
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
      <ToastContainer />
    </div>
  );
}
