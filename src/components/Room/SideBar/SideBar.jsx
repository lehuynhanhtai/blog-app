"use client";
import Link from "next/link";
import styles from "./sideBar.module.css";
import Image from "next/image";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { popularPosts } from "@/utils/callAPI";

const fetcher = async (url) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }

  return data;
};

async function getDataMembers() {
  const response = await fetch(`/api/members`, { method: "GET" });
  // Kiểm tra xem response có thành công không
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  // Parse response thành dạng JSON
  const data = await response.json();
  return data;
}

const SideBar = (params) => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDataMembers();
      setMembers(data);
    };
    fetchData();
  }, []);
  const filterMembers = members?.filter((item) => item.roomId === params.id);
  const { data } = useSWR(`/api/room/${params.id}`, fetcher);
  return (
    <div className={styles.container}>
      <div className={styles.sessionLeader}>
        <h3 style={{ textAlign: "center", padding: 10 }}>{data?.roomName}</h3>
        <div className={styles.leader}>
          <Link href={``} className={styles.imageContainer}>
            {data?.user?.image && (
              <Image
                src={data?.user?.image}
                alt=""
                priority={true}
                fill
                className={styles.image}
                loading="eager"
                unoptimized={true}
                decoding="async"
                timeout={10000}
              />
            )}
          </Link>
          <div className={styles.inforLeader}>
            <span>@{data?.user?.name}</span>
            <span>Trưởng phòng</span>
          </div>
        </div>
      </div>
      <div className={styles.sessionMember}>
        <h3>Thành viên</h3>
        {filterMembers?.map((item) => (
          <div className={styles.leader} key={item.id}>
            <Link href={``} className={styles.imageContainer}>
              {item?.user?.image && (
                <Image
                  src={item?.user?.image}
                  alt=""
                  priority={true}
                  fill
                  className={styles.image}
                  loading="eager"
                  unoptimized={true}
                  decoding="async"
                  timeout={10000}
                />
              )}
            </Link>
            <div className={styles.inforLeader}>
              <span>@{item?.user?.name}</span>
              <span>Thành viên</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
