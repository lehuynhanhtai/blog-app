"use client";
import { getAllUser } from "@/utils/callAPI";
import styles from "./usersPage.module.css";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { bouncy } from "ldrs";
import { UserAddOutlined } from "@ant-design/icons";
import SearchInput from "@/components/searchInput/SearchInput";
import SearchUsers from "@/components/searchUser/SearchUser";

bouncy.register();

const User = () => {
  const [data, setData] = useState();
  const [visible, setVisible] = useState(4);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllUser().then((data) => {
      setData(data);
    });
  }, []);

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisible((prevValue) => prevValue + 2);
      setLoading(false);
    }, 2000);
  };

  return (
    <div>
      <div className={styles.banner}>
        <h1>NHỮNG TÁC GIẢ NỔI BẬT</h1>
        <h3>Những thành viên hoạt động tích cực và có nhiều bài viết hay</h3>
      </div>

      <SearchUsers getSearchResults={(results) => setData(results)} />

      {data?.slice(0, visible).map((item) => (
        <div className={styles.itemUser} key={item.id}>
          <div className={styles.item}>
            <Link href={`/users/${item.id}`} className={styles.imageContainer}>
              {item?.image && (
                <Image
                  src={item?.image}
                  alt=""
                  priority={true}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                  className={styles.image}
                  loading="eager"
                  unoptimized={true}
                  decoding="async"
                  timeout={10000}
                />
              )}
            </Link>
            <div className={styles.infor}>
              <Link className={styles.username} href={`/users/${item.id}`}>
                {item.name}
              </Link>
              <p>{item.slogan}</p>
            </div>
          </div>
          <div className={styles.follow}>
            <p>Dang Theo doi</p>
            <UserAddOutlined style={{ fontSize: 18 }} />
          </div>
        </div>
      ))}

      {loading && (
        <div className={styles.loading}>
          <l-bouncy size="45" speed="1" color="#aaa" bg-opacity=".1" />
        </div>
      )}

      {data?.length > visible && !loading && (
        <div style={{ textAlign: "center" }}>
          <button
            className={styles.button}
            onClick={handleLoadMore}
            disabled={loading}
          >
            Xem Thêm
          </button>
        </div>
      )}
    </div>
  );
};

export default User;
