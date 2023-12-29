import styles from "./homepage.module.css";
import Featured from "@/components/featured/Featured";
import CategoryList from "@/components/categoryList/CategoryList";
import CardList from "@/components/cardList/CardList";
import Menu from "@/components/menu/Menu";
import Banner from "@/components/banner/banner";
import CardListFooter from "@/components/cardListFooter/CardListFooter";

export default function Home() {
  return (
    <div className={styles.container}>
      <Banner />
      <CategoryList />
      <Featured />
      <div className={styles.content}>
        <CardList />
        <Menu />
      </div>
      <CardListFooter />
    </div>
  );
}
