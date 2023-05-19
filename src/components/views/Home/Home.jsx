import { Cards } from "../../Cards/Cards";
import FilterBar from "../../FilterBar/FilterBar";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <FilterBar />
      <Cards />
    </div>
  );
};

export default Home;
