import { useEffect, useState } from "react";
import style from "./Cart.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getCart } from "../redux/actions";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const storeValue = JSON.parse(window.localStorage.getItem("cart", cart));

  useEffect(() => {
    dispatch(getCart());
  }, []);

  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  console.log(window.localStorage);
  console.log(cart);
  console.log(storeValue);

  return (
    <div className={style.container}>
      <h1 className={style.title}>My Cart</h1>
      <div className={style.containerService}>
        {storeValue.length > 0 &&
          storeValue.map((elem) => (
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
