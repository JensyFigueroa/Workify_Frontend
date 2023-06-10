import styles from "../Card/Card.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { addToCart } from "../../NewCart/NewCart";

export function Card({
  id,
  nameService,
  image,
  typeService,
  pricePerHour,
  emailUserService,
  rating,
  nameUserService

}) {
  const currentUserNameLoggedIn = useSelector(
    (state) => state.currentUserNameLoggedIn
  );

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img className={styles.img} src={image} alt="img" />
        <div className={styles.info}>
          <div className={styles.pRating}>
            <p>
              <h5>{nameService}</h5>
            </p>
            <div>{rating}</div>
          </div>
          <p>
            Category: <span>&nbsp;{typeService}</span>{" "}
          </p>
          <p>
            Service Provider: <span> &nbsp;{nameUserService}</span>
          </p>
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.addService}
            onClick={() =>
              addToCart({
                id,
                nameService,
                pricePerHour,
                emailUserService,
                quantity: 1,
              })
            }
          >
            Add service
          </button>
          <Link to={`/detail/${id}`}>
            <button className={styles.btn}>More info...</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
