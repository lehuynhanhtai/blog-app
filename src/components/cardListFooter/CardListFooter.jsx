"use client";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper/modules";
import styles from "./cardListFooter.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { popularPosts } from "@/utils/callAPI";
import Link from "next/link";

const CardListFooter = () => {
  const [post, setPost] = useState([]);
  const shuffledPost = [...post].sort(() => Math.random() - 1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await popularPosts();
        setPost(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1 style={{ marginBottom: 20, marginTop: 20 }}>Bạn có thể quan tâm</h1>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 40,
          },
        }}
        modules={[Pagination]}
        className={styles.container}
      >
        {shuffledPost?.slice(0, 10).map((item) => (
          <SwiperSlide key={item.id} className={styles.itemSwiper}>
            <Link href={`/posts/${item.slug}`}>
              <div className={styles.imgContainer}>
                {item?.img && (
                  <Image
                    className={styles.img}
                    src={item?.img}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                    priority={true}
                    loading="eager"
                    unoptimized={true}
                    decoding="async"
                    timeout={10000}
                  />
                )}
              </div>
            </Link>
            <div className={styles.content}>
              <span style={{ textTransform: "uppercase" }}>
                {item.cat.name}
              </span>
              <h2 className={styles.title}>{item.title}</h2>
              <p
                className={styles.desc}
                dangerouslySetInnerHTML={{ __html: item.desc }}
              ></p>
              <span className={styles.author}>{item.user.name}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default CardListFooter;
