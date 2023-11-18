"use client";
import React, { useEffect, useState } from "react";
import styles from "./cardList.module.css";
import Pagination from "../pagination/Pagination";
import Card from "../card/Card";
import { findAllPosts } from "@/utils/callAPI";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const CardList = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState();
  const router = useRouter();

  useEffect(() => {
    findAllPosts(page)
      .then((data) => {
        setData(data.posts);
        setPage(data.page);
        setCount(data.count);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [page]);

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
      <h2>{page} current</h2>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.posts}>
        {data?.map((item) => {
          return <Card item={item} key={item.id} />;
        })}
      </div>
      <div className={styles.pagination}>
        <button
          className={styles.button}
          onClick={(event) => handlePrev(event)}
        >
          Previous
        </button>
        <button
          className={styles.button}
          onClick={(event) => handleNext(event)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CardList;
