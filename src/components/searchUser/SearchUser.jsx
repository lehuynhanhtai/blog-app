"use client";

import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import styles from "./searchUser.module.css";

export default function SearchUsers({ getSearchResults }) {
  const [query, setQuery] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/searchuser?query=${query}`);
    const user = await response.json();
    getSearchResults(user);
  };

  return (
    <div>
      <form className={styles.container} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="Search user..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className={styles.button} type="submit">
          <SearchOutlined />
        </button>
      </form>
    </div>
  );
}
