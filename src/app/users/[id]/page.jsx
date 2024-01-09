"use client";

import { getOneUser } from "@/utils/callAPI";
import React, { useEffect, useState } from "react";
import styles from "./userSingle.module.css";
import Image from "next/image";
import TabsBar from "@/components/tabsBar/TabsBar";
import Link from "next/link";
import { MessageOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";

const SinglePageUser = ({ params }) => {
  const { id } = params;
  const [dataUser, setDataUser] = useState([]);
  const { post } = dataUser;
  const { data } = useSession();
  useEffect(() => {
    getOneUser(id).then((data) => {
      setDataUser(data);
    });
  }, [id]);

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.bgImageContainer}>
          {dataUser?.backgroundUser && (
            <Image
              className={styles.bgImage}
              src={dataUser?.backgroundUser}
              alt=""
              priority={true}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
              loading="eager"
              unoptimized={true}
              decoding="async"
              timeout={10000}
            />
          )}
        </div>
        <div className={styles.imgContainer}>
          {dataUser?.image && (
            <Image
              className={styles.image}
              src={dataUser?.image}
              alt=""
              priority={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
              fill
              loading="eager"
              unoptimized={true}
              decoding="async"
              timeout={10000}
            />
          )}
        </div>
      </div>

      <div className={styles.infor}>
        <div className={styles.name}>
          <h1>{dataUser?.name}</h1>
        </div>
        {data?.user.name === dataUser.name ? (
          <></>
        ) : (
          <button className={styles.buttonInfor}>
            Nhắn tin <MessageOutlined />
          </button>
        )}
      </div>
      <div className={styles.menuInfor}>
        <div className={styles.menu1}>
          {data?.user.name === dataUser.name ? (
            <Link
              className={styles.editInfor}
              href={`/editprofile/${data?.user.id}`}
            >
              Chỉnh sửa trang cá nhân
            </Link>
          ) : (
            <Link className={styles.editInfor} href="/">
              Theo dõi
            </Link>
          )}

          <div className={styles.groupFollow}>
            <p>followers: 12</p>
            <p>following: 13</p>
          </div>
          <q>{dataUser?.slogan}</q>
        </div>
        <TabsBar dataUser={post} />
      </div>
    </div>
  );
};

export default SinglePageUser;
