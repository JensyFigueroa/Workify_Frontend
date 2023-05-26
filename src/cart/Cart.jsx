import { useEffect, useState } from "react";
import style from "./Cart.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getCart } from "../redux/actions";
import { Card } from "../components/Card/Card";

const cartFromLocalStorage = JSON.parse(
  window.localStorage.getItem("cart") || "[]"
);

const Cart = () => {
  return (
    <div className={style.container}>
      <h1 className={style.title}>My Cart</h1>
      <div className={style.containerService}>
        {cartFromLocalStorage.length > 0 &&
          cartFromLocalStorage.map((elem) => (
            <div className={style.containerCart} key={elem.id}>
              <h1>{elem.nameService}</h1>
              <h3>Price Per Hour: $ {elem.pricePerHour}</h3>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Cart;

// const dispatch = useDispatch();
// const cart = useSelector((state) => state.cart);

// useEffect(() => {
//   dispatch(getCart());
// }, []);
