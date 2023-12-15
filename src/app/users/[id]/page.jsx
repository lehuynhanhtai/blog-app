import { getOneUser } from "@/utils/callAPI";
import React from "react";
import styles from "./userSingle.module.css";
import Image from "next/image";
import TabsBar from "@/components/tabsBar/TabsBar";
import Link from "next/link";
import { MessageOutlined } from "@ant-design/icons";

const SinglePageUser = async ({ params }) => {
  const { id } = params;
  const dataUser = await getOneUser(id);
  const { post } = dataUser;
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
          <Image
            className={styles.image}
            src={dataUser?.image}
            alt=""
            priority={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
            loading="eager"
            unoptimized={true}
            fill
            decoding="async"
            timeout={10000}
          />
        </div>
      </div>
      <div className={styles.infor}>
        <div className={styles.name}>
          <h1>{dataUser?.name}</h1>
        </div>
        <div className={styles.groupButton}>
          <button className={styles.buttonInfor}>
            Nhắn tin <MessageOutlined />
          </button>
        </div>
      </div>
      <div className={styles.menuInfor}>
        <div className={styles.menu1}>
          <Link className={styles.editInfor} href={``}>
            Chỉnh sửa trang cá nhân
          </Link>
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
