"use client";
import React, { useEffect, useState } from "react";
import styles from "./cardList.module.css";
import Pagination from "../pagination/Pagination";
import Card from "../card/Card";
import { findAllPosts } from "@/utils/callAPI";
import { useRouter } from "next/navigation";

const CardList = (props) => {
  const { cat } = props;
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState();
  const router = useRouter();
  useEffect(() => {
    findAllPosts(page, cat)
      .then((data) => {
        setData(data.posts);
        setPage(data.page);
        setTotalPage(data.totalPage);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [page, cat]);

  const handleNext = (event) => {
    event.preventDefault();
    const newPage = page + 1;
    router.push(`?page=${newPage}`, {
      scroll: false,
    });
    setPage(newPage);
  };

  const handlePrev = (event) => {
    event.preventDefault();
    const newPage = page - 1;
    router.push(`?page=${newPage}`, {
      scroll: false,
    });
    setPage(newPage);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.posts}>
        {data?.map((item) => {
          return <Card item={item} key={item.id} />;
        })}
      </div>
      <div className={styles.pagination}>
        <button
          className={styles.button}
          disabled={page === 1}
          onClick={(event) => handlePrev(event)}
        >
          Previous
        </button>
        <h3>
          {page} / {totalPage}
        </h3>
        <button
          className={styles.button}
          disabled={page === totalPage}
          onClick={(event) => handleNext(event)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CardList;
