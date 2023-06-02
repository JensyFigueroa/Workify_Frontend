import styles from "./Cards.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getServices } from "../../redux/actions";
import { Card } from "../Card/Card";
import { useEffect, useState } from "react";
import faceThink from "./face-think.png";

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
