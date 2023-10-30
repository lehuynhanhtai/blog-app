import React from "react";
import styles from "./singlePage.module.css";
import Image from "next/image";
import Menu from "@/components/menu/Menu";
import Comment from "@/components/comment/Comment";

const SinglePage = () =>{
    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div className={styles.textContainer}>
                    <h1>By installing this component and writing only a little bit of CSS you can obtain this: Note: You should write your own css to obtain this UI. This package do not provide any css.</h1>
                    <div className={styles.user}>
                        <div className={styles.userImageContainer}>
                            <Image src="/p1.jpeg" alt="" fill className={styles.avatar}/>
                        </div>
                        <div className={styles.userTextContainer}>
                            <span className={styles.username}>ATKill</span>
                            <span className={styles.date}>01.01.2024</span>
                        </div>
                    </div>
                </div>
                <div className={styles.imageContainer}>
                    <Image src="/p1.jpeg" alt="" fill className={styles.image}/>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.post}>
                    <div className={styles.description}>
                        <p>
                            By installing this component and writing only a little bit of CSS you can obtain this: Note: You should write your own css to obtain this UI. This package do not provide any css.
                        </p>
                        <h2>
                            day la tieu de
                        </h2>
                        <p>
                            By installing this component and writing only a little bit of CSS you can obtain this: Note: You should write your own css to obtain this UI. This package do not provide any css.
                        </p>
                    </div>
                    <div className={styles.comment}>
                        <Comment/>
                    </div>
                </div>
                <Menu/>
            </div>
        </div>
    )
}

export default SinglePage;