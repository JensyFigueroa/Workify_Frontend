import { useEffect, useState } from "react";
import { Cards } from "../../Cards/Cards";
import FilterBar from "../../FilterBar/FilterBar";
import styles from "./Home.module.css";
import { Loading } from "../../Loading/Loading";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const uidHome = useSelector((state) => state.currentUserIdLoggedIn);
  const nameHome = useSelector((state) => state.currentUserNameLoggedIn);

  // console.log(uidHome, "uid desde home con use selector");
  // console.log(nameHome, "name desde home con use selector");

  const allServices = useSelector((state) => state.allServices);
  useEffect(() => {
    setTimeout(() => setLoading(false), 4000);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (allServices.length > 0) {
      setLoading(false);
    }
  }, [allServices]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.container}>
          <FilterBar />
          <Cards />
        </div>
      )}
    </>
  );
};

export default Home;
