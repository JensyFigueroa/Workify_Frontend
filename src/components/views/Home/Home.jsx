import { useEffect, useState } from "react";
import { Cards } from "../../Cards/Cards";
import FilterBar from "../../FilterBar/FilterBar";
import styles from "./Home.module.css";
import { Loading } from "../../Loading/Loading";
const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    setTimeout(() => setLoading(false), 3000);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.container}>
             {loading ? (
                <Loading/>
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
