import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCart } from "../../redux/actions";
import style from "./Cart.module.css";

const Cart = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCart());
  }, []);

  const cart = useSelector((state) => state.cart);
  console.log(cart);
  return (
    <div className={style.container}>
      <h1 className={style.title}>My Cart</h1>
      <div className={style.containerService}>
        {cart.length > 0 &&
          cart.map((elem, i) => (
            <div className={style.containerCart} key={elem.id}>
              <h1>{elem.nameService}</h1>
              <h3>Price Per Hour:$ {elem.pricePerHour}</h3>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Cart;
