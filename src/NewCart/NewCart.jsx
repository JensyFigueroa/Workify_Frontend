import { useState, useEffect } from "react";
import styles from "./NewCart.module.css";
import { useSelector } from "react-redux";
import Pasarela from "../components/Pasarela/Pasarela";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Login from "../components/Login/Login";
import { BsFillTrash3Fill } from "react-icons/bs";

const promiseStripe = loadStripe(
  "pk_test_51NBQA0BpeRt7rcmet7zt0iDB39vFiEWAF1fC9g0mXU9UWuG5E50VE5j5o8AgcsZkeUv9iD4fWK4cUu9kKOqwhzKn00aWDy85Vh"
);

const addToCart = (product) => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const existingItem = cartItems.find((item) => item.id === product.id);
  if (existingItem) {
    // Service already exists in the cart, update the quantity instead of adding a new item
    existingItem.quantity += product.quantity;
  } else {
    cartItems.push(product);
  }
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

const NewCart = () => {
  const userId = useSelector((state) => state.currentUserIdLoggedIn);
  const [payActive, setPayActive] = useState(false);

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const updateQuantity = (product, quantity) => {
    if (quantity >= 0) {
      const updatedCart = cartItems.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity };
        }
        return item;
      });
      setCartItems(updatedCart);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    }
  };

  const removeFromCart = (product) => {
    const updatedCart = cartItems.filter((item) => item.id !== product.id);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const increaseQuantity = (product) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === product.id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const calculateSubtotal = (item) => {
    return item.quantity * item.pricePerHour;
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + calculateSubtotal(item),
      0
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
    axios
      .get(`/user/vacateCart/${idUser}`)
      .then((response) => console.log(response, `salio todo bien`))
      .catch((error) => console.log(`salio todo mal`, error));
  };

  const handleNewViewPay = async () => {
    const { data } = await axios.post("/payment/newPay", {
      cartItems,
    });
    console.log(data);
    window.open(data.url, "_blank");
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1>Services Cart</h1>
        <button onClick={clearCart} className={styles.clearButton}>
          <BsFillTrash3Fill />
          Delete Cart
        </button>
      </div>
      <div className={styles.cartContainer}>
        {cartItems.length === 0 ? (
          <p>There are no products in the cart.</p>
        ) : (
          <div className={styles.cartItems}>
            <ul className={styles.list}>
              <li className={styles.listHeader}>
                <span>Name</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Subtotal</span>
                <span>Add - Remove</span>
              </li>
              {cartItems.map((item) => (
                <li key={item.id} className={styles.listItem}>
                  <span>{item.nameService}</span>
                  <span>${item.pricePerHour}</span>
                  <span>{item.quantity}</span>
                  <span>${calculateSubtotal(item)}</span>
                  <span className={styles.addRemove}>
                    <button onClick={() => increaseQuantity(item)}>+</button>
                    <button
                      onClick={() => updateQuantity(item, item.quantity - 1)}
                    >
                      -
                    </button>
                    <button onClick={() => removeFromCart(item)}>
                      <BsFillTrash3Fill />
                    </button>
                  </span>
                  <span></span>
                </li>
              ))}
            </ul>
            <div className={styles.totalContainer}>
              <h2>Total: ${calculateTotal()}</h2>
              {userId ? (
                <button className={styles.pay} onClick={handleNewViewPay}>
                  Pay
                </button>
              ) : (
                <>
                  <button className={styles.login}>
                    <span>Must</span> &nbsp;
                    <Login />
                    &nbsp;<span>first</span>
                  </button>
                </>
              )}
            </div>
            {payActive && (
              <div className={styles.popUp} onClick={handlePopupClick}>
                <div className={styles.pasarela}>
                  <Elements stripe={promiseStripe}>
                    <Pasarela
                      userId={userId}
                      cartItems={cartItems}
                      totalPay={calculateTotal()}
                    />
                  </Elements>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewCart;
export { addToCart };
