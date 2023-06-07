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
  emailUserService,
  rating
}) {
  const dispatch = useDispatch();
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
          <p>Category: <span>&nbsp;{typeService}</span> </p>
          <p>Service Provider: <span> &nbsp;{currentUserNameLoggedIn[0]}</span></p>
          
        </div>
        <div className={styles.buttons}>
          <button className={styles.addService}
            onClick={() =>
              dispatch(
                addServiceInCart({
                  id,
                  nameService,
                  pricePerHour,
                  emailUserService,
                })
              )
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
