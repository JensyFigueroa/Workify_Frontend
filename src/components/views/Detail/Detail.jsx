import { useParams } from "react-router-dom";
import { getServiceDetail } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import style from "./Detail.module.css";

export function Detail(){
    // const {id} = useParams();
    // const dispatch = useDispatch();
    // const serviceDetail = useSelector(state => state.serviceDetail);

    // useEffect(() => {
    //     useDispatch(getServiceDetail(id));
    // }, [dispatch, id])
    return (
    <div>
    <div className="container d-flex flex-column">
      <div className={style.smallContainer}>
        <p>Nombre</p>
        <p>Ubicación</p>
      </div>
      <div className={style.mediumContainer}>
        <p>Trabajos realizados</p>
      </div>
      <div className={style.largeContainer}>
        <div className={style.abilities}>
            <p>Habilidades</p>
            <p>Reseñas</p>
        </div>
        <div className={style.reserv}>
            <p>Reserva</p>
        </div>
      </div>
    </div>

        
    </div>)
    ;
}