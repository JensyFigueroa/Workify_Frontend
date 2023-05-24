import styles from "./Cards.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getServices } from "../../redux/actions";
import { Card } from "../Card/Card";
import { useEffect } from "react";
import faceThink from './face-think.png'

export function Cards() {
  const dispatch = useDispatch();
  const allServices = useSelector((state) => state.allServices);

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      {allServices.length > 0 ? 
        allServices.map((serv, index) => {
          return (
            <Card
              id={serv.id}
              key={index}
              image={serv.imageUrl}
              nameService={serv.nameService}
              typeService={serv.typeService}
            />
          );
        }): <div className={styles.msgBox}>
              <p className={styles.msg}>No services found with that name</p>
              <img src={faceThink} alt="" />
            </div> }
    </div>
  );
}
