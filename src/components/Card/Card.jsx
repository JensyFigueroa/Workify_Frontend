import style from "../Card/Card.module.css";
import { Link } from "react-router-dom";
export function Card({id, name, username, email}){

    return (
    <div className = {style.container}>
        <div className={style.card}>
    <Link className={style.card} to={`/detail/${id}`}>
        <p>name: {name}</p>
    </Link>
        <p>address: {username}</p>
        <p>email: {email}</p>
        </div>
    </div>
    );
}