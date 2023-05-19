import styles from "../Card/Card.module.css";
import { Link } from "react-router-dom";
export function Card({ id, nameService, image, typeService }) {
  return (
    <div className={styles.container}>
      <Link className={styles.card} to={`/detail/${id}`}>
        <img className={styles.img} src={image} alt="img" />
        <p>Service: {nameService}</p>
        <p>Type: {typeService}</p>
        <button>More info...</button>
      </Link>
    </div>
  );
}
