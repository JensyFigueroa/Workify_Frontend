import styles from "./Cards.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getServices } from "../../redux/actions";
import { Card } from "../Card/Card";
import { useEffect, useState } from "react";
import faceThink from "./face-think.png";
import RatingStars from 'react-rating-stars-component';


const cartFromLocalStorage = JSON.parse(
  window.localStorage.getItem("cart") || "[]"
);

export function Cards() {
  const [cart, setCart] = useState(cartFromLocalStorage);
  const dispatch = useDispatch();
  let allServices = useSelector((state) => state.allServices);
  const filterLocation = useSelector((state) => state.selectedLocation);
  const filterItem = useSelector((state) => state.selectedItem);
  const searchServices = useSelector((state) => state.searchServices);

  let services = [];

  if (searchServices.length > 0) {
    services = searchServices;
  } else {
    services = allServices;
  }

  useEffect(() => {
    if (filterLocation === null && filterItem === null) {
      dispatch(getServices());
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (newItem) => {
    setCart((prevCart) => [...prevCart, newItem]);
  };

  console.log(services);
  return (
    <div className={styles.container}>
      {services.length > 0 ? (
        services.map((serv, index) => {
          return (
            <Card
              id={serv.id}
              key={index}
              image={serv.imageUrl[0]}
              nameService={serv.nameService}
              typeService={serv.typeService}
              pricePerHour={serv.pricePerHour}
              emailUserService={serv.emailUserService}
              enabled = {serv.enabled}
              rating = {serv.reviews && serv.reviews.length > 0 ? (
                <div className={styles.ratings}>
                  {
                    (() => {
                      const sum = serv.reviews.map((review) => parseFloat(review.rating))
                        .reduce((a, b) => (!isNaN(a) ? a : 0) + (!isNaN(b) ? b : 0));
                      const averageRating = sum / serv.reviews.length;
                      return isNaN(averageRating) ? 'Invalid ratings' : averageRating.toFixed(1);
                    })()
                  }
                  <RatingStars
                    count={1}
                    value={
                      (() => {
                        const sum = serv.reviews.map((review) => parseFloat(review.rating))
                          .reduce((a, b) => (!isNaN(a) ? a : 0) + (!isNaN(b) ? b : 0));
                        const averageRating = sum / serv.reviews.length;
                        return isNaN(averageRating) ? 0 : averageRating;
                      })()
                    }
                    size={24} // Tamaño de las estrellas
                    color1={'#ddd'} // Color de las estrellas inactivas
                    color2={'#ffd700'} // Color de las estrellas activas
                    edit={false}
                  />
                </div>
              ) : (
                <p className={styles.zeroStar}>0
                <RatingStars
                count={1}
                size={24} // Tamaño de las estrellas
                color1={'#ddd'} // Color de las estrellas inactivas
                color2={'#ffd700'} // Color de las estrellas activas
                edit={false}
              /></p>
                
              )}

              addToCart={addToCart}

            />
          );
        })
      ) : (
        <div className={styles.msgBox}>
          <p className={styles.msg}>No services found with that name</p>
          <img src={faceThink} alt="" />
        </div>
      )}
    </div>
  );
}
