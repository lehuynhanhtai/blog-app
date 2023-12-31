import styles from "./categoryList.module.css";
import Link from "next/link";
import Image from "next/image";
import { findAllCategories } from "@/utils/callAPI";

const CategoryList = async () => {
  const categories = await findAllCategories();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Danh mục phổ biến</h1>
      <div className={styles.categories}>
        {categories?.slice(0, 6).map((item) => (
          <Link
            href={`/blog?cat=${item.slug}`}
            className={`${styles.category} `}
            key={item.id}
          >
            {item.img && (
              <Image
                src={item.img}
                alt=""
                width={32}
                height={32}
                className={styles.image}
                loading="eager"
                unoptimized={true}
                decoding="async"
                timeout={10000}
              />
            )}
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
