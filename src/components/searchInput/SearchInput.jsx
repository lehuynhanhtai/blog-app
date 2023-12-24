"use client";
import { useState } from "react";
import styles from "./searchInput.module.css";
import { SearchOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const onSearch = (event) => {
    event.preventDefault();
    const encodedSearchQuery = encodeURIComponent(searchQuery);
    router.push(`search?q=${encodedSearchQuery}`);
  };
  return (
    <form className={styles.container} onSubmit={onSearch}>
      <input
        type="text"
        placeholder="nhập từ khóa..."
        className={styles.input}
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      />
      <button className={styles.button} type="submit">
        <SearchOutlined />
      </button>
    </form>
  );
};

export default SearchInput;
