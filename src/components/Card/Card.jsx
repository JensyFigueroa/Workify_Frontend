import styles from "../Card/Card.module.css";
import { Link } from "react-router-dom";
import { addServiceInCart } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export function Card({
  id,
  nameService,
  image,
  typeService,
  handleSelect,
  pricePerHour,
  addToCart,
}) {
  const dispatch = useDispatch();
  const currentUserNameLoggedIn = useSelector(state => state.currentUserNameLoggedIn);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img className={styles.img} src={image} alt="img" />
        <div className={styles.info}>
          <p>{nameService}</p>
          <p>Category: {typeService}</p>
          <p>Service Provider: {currentUserNameLoggedIn[0]}</p>
          <p>Rating:  </p>
        </div>
        <div className={styles.buttons}>
          <button
            onClick={() =>
              dispatch(addServiceInCart({ id, nameService, pricePerHour }))
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
