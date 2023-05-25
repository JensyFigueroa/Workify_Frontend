import styles from "./Cards.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getServices } from "../../redux/actions";
import { Card } from "../Card/Card";
import { useEffect } from "react";
import faceThink from "./face-think.png";
import { addServiceInCart } from "../../redux/actions";

export function Cards() {
  const dispatch = useDispatch();
  const allServices = useSelector((state) => state.allServices);
  const filterLocation = useSelector((state) => state.selectedLocation);
  const filterItem = useSelector((state) => state.selectedItem);

  useEffect(() => {
    if (filterLocation === null && filterItem === null) {
      dispatch(getServices());
    }
  }, []);

  const handleSelect = (id, nameService, pricePerHour) => {
    dispatch(addServiceInCart({ id, nameService, pricePerHour }));
  };
  const cart = useSelector((state) => state.cart);

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
              handleSelect={handleSelect}
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
