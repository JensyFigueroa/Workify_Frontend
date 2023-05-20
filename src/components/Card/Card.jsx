import styles from "../Card/Card.module.css";
import { Link } from "react-router-dom";
export function Card({ id, nameService, image, typeService }) {
  return (
    <div className={styles.container}>
      <Link className={styles.card} to={`/detail/${id}`}>
        <img className={styles.img} src={image} alt="img" />
        <div className={styles.info}>
          <p>{nameService}</p>
          <p>{typeService}</p>
        </div>
        <button className={styles.btn}>More info...</button>
      </Link>
    </div>
  );
}
