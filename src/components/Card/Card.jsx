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
                <strong >{nameService}</strong>
              </p>
            <div>{rating}</div>
            </div>
          <p><strong className={styles.strongP}>Category:</strong> {typeService}</p>
          <p><strong className={styles.strongP}>Service Provider:</strong> {currentUserNameLoggedIn[0]}</p>
         
          
          
        </div>
        <div className={styles.buttons}>
          <button
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
