import { useParams } from "react-router-dom";
import { getServiceDetail } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import style from "./Detail.module.css";

export function Detail(){
    const {id} = useParams();
    const dispatch = useDispatch();
    const serviceDetail = useSelector(state => state.serviceDetail);

    useEffect(() => {
        dispatch(getServiceDetail(id));
    }, [dispatch])

    return (
    <div>
    <div className="container d-flex flex-column">
      <div className={style.smallContainer}>
        <p>Service: {serviceDetail.nameService}</p>
        <p>Type: {serviceDetail.typeService}</p>
        <p>Location: {serviceDetail.location?.pais}</p>
      </div>
      <div className={style.mediumContainer}>
        <p>Trabajos realizados</p>
       <img src={serviceDetail.imageUrl[0]} alt="img"/>
      </div>
      <div className={style.largeContainer}>
        <div className={style.abilities}>
            <p>Description: {serviceDetail.description}</p>
            <p>Reviews: {serviceDetail.reviews}</p>
        </div>
        <div className={style.reserv}>
            <p>Reserva</p>
        </div>
      </div>
    </div>

        
    </div>)
    ;
}