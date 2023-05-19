import style from "../Card/Card.module.css";
import { Link } from "react-router-dom";
export function Card({id, nameService, image, typeService}){

    return (
    <div className = {style.container}>
        <div className={style.card}>
    <Link className={style.card} to={`/detail/${id}`}>
        <img src={image} alt="img"/>
    </Link>
        <p>Service: {nameService}</p>
        <p>Type: {typeService}</p>
        </div>
    </div>
    );
}