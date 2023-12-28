"use client";
import SearchInput from "@/components/searchInput/SearchInput";
import styles from "./searchPage.module.css";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import Image from "next/image";
import dateFormat from "dateformat";
import Link from "next/link";

const fechPost = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed data");
  }
  return response.json();
};

const SearchPage = () => {
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;
  const { data } = useSWR(`/api/search?q=${searchQuery}`, fechPost);

  if (!data) {
    return null;
  }

  return (
    <>
      <SearchInput />
      <div style={{ textAlign: "center", marginTop: 20, fontSize: 18 }}>
        Từ khóa đang tìm kiếm: <b>{searchQuery}</b>
      </div>
      {data?.length === 0 ? (
        searchQuery === null ? (
          " "
        ) : (
          <p style={{ textAlign: "center", marginTop: 30 }}>
            Không tìm thấy từ khóa trên
          </p>
        )
      ) : (
        data?.map((item) => (
          <div className={styles.item} key={item.id}>
            <Link
              href={`/posts/${item.slug}`}
              className={styles.imageContainer}
            >
              {item?.img && (
                <Image
                  src={item.img}
                  alt=""
                  className={styles.image}
                  loading="eager"
                  unoptimized={true}
                  decoding="async"
                  timeout={10000}
                  width={150}
                  height={150}
                />
              )}
            </Link>
            <div className={styles.desc}>
              <h2 className={styles.title}>
                <Link href={`/posts/${item.slug}`}>{item.title}</Link>
              </h2>
              <span
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: item.desc }}
              ></span>
              <div className={styles.author}>
                <span>{item.user.name}</span>
                <span>{dateFormat(item.createdAt, "dd-mm-yyyy")}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default SearchPage;
