import styles from "./loading.module.css";

export default function Loading() {
  return (
    <main className={styles.animation}>
      <div className={styles.lds_ring}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </main>
  );
}
