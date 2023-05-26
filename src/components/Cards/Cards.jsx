import styles from "./Cards.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getServices } from "../../redux/actions";
import { Card } from "../Card/Card";
import { useEffect, useState } from "react";
import faceThink from "./face-think.png";
import { addServiceInCart } from "../../redux/actions";

const cartFromLocalStorage = JSON.parse(
  window.localStorage.getItem("cart") || "[]"
);

export function Cards() {
  const [cart, setCart] = useState(cartFromLocalStorage);
  const dispatch = useDispatch();
  const allServices = useSelector((state) => state.allServices);
  const filterLocation = useSelector((state) => state.selectedLocation);
  const filterItem = useSelector((state) => state.selectedItem);

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
  console.log(cart);
  console.log(cartFromLocalStorage);
  console.log(window.localStorage);

  return (
    <div className={styles.container}>
      {allServices.length > 0 ? (
        allServices.map((serv, index) => {
          return (
            <Card
              id={serv.id}
              key={index}
              image={serv.imageUrl}
              nameService={serv.nameService}
              typeService={serv.typeService}
              pricePerHour={serv.pricePerHour}
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
