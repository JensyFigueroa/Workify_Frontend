import style from "../Card/Card.module.css";

export function Card({name, username, email}){

    return (
    <div className = {style.container}>
    <div className={style.card}>
        <p>name: {name}</p>
        <p>address: {username}</p>
        <p>email: {email}</p>
    </div>
    </div>
    );
}