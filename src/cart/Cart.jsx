import { useState } from "react";
import style from "./Cart.module.css";
import { useEffect } from "react";

const Cart = () => {
  const cartFromLocalStorage = JSON.parse(
    window.localStorage.getItem("cart") || "[]"
  );

  const [cartItems, setCartItems] = useState(cartFromLocalStorage);

  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleCleanCart = () => {
    window.localStorage.removeItem("cart");
    window.location.reload();
  };

  const total = cartFromLocalStorage.map((ele) => {
    return (ele.pricePerHour = +ele.pricePerHour);
  });

  console.log(total);

  const handleChange = (e) => {};

  console.log(cartFromLocalStorage);
  console.log(cartItems);

  return (
    <div className={style.container}>
      <div>
        <h1 className={style.title}>My Cart</h1>
        <button onClick={handleCleanCart}>Clean Cart</button>
      </div>
      <div className={style.containerService}>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div className={style.containerCart} key={item.id}>
              <div>
                <h1>{item.nameService}</h1>
                <h3>Price Per Hour: ${item.pricePerHour}</h3>
              </div>
              <div>
                <button
                // onClick={() => {
                //   item.pricePerHour -= item.pricePerHour;
                // }}
                >
                  -
                </button>
                <input
                  value={item.quantity}
                  onChange={handleChange}
                  type="number"
                  min="1"
                />
                <button
                  onClick={() => {
                    item.pricePerHour += item.pricePerHour;
                  }}
                >
                  +
                </button>
              </div>
              <div>
                {" "}
                <h2>Sub Total: {item.pricePerHour} </h2>
              </div>
            </div>
          ))
        ) : (
          <p>No items in the cart</p>
        )}
      </div>
      <div className={style.totalContainer}>
        <h2>Total: {total}</h2>
        <button> Pagar </button>
      </div>
    </div>
  );
};

export default Cart;
