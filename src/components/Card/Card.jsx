import styles from "../Card/Card.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeService, restoreService } from "../../redux/actions";

export function Card({
  id,
  nameService,
  image,
  typeService,
  pricePerHour,
  emailUserService,
  rating,
  nameUserService,
  enabled
}) {
  const dispatch = useDispatch();
  const deletedServices = useSelector(state => state.deletedServices);
  if (enabled === false){
    dispatch(removeService(id)); // Retorna null si enabled es false para ocultar la carta
  } else{
    dispatch(restoreService(deletedServices))
  }

  // if(!enabled){
  //   return null
  // }

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
              dispatch(
                addToCart({
                  id,
                  nameService,
                  pricePerHour,
                  emailUserService,
                  quantity: 1,
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
