import { useEffect, useState } from "react";
import { Cards } from "../../Cards/Cards";
import FilterBar from "../../FilterBar/FilterBar";
import styles from "./Home.module.css";
import { Loading } from "../../Loading/Loading";
import { useSelector } from "react-redux";
const Home = () => {
  const [loading, setLoading] = useState(true);
//toco daniel linea 10 y 11
const uidHome = useSelector((state) => state.currentUserIdLoggedIn);
console.log(uidHome, 'uid desde home con use selector');

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.container}>
          <FilterBar />
          <Cards />
        </div>
      )}
    </div>
  );
};

export default Home;
