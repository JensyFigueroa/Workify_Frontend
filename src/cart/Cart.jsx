import { useState } from "react";
import style from "./Cart.module.css";
import { useEffect } from "react";
import { getCart } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  // const cartRedux = useSelector((state) => state.cart);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getCart());
  // }, []);

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    let data = window.localStorage.getItem("cart");
    if (data) {
      setCartItems(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleCleanCart = () => {
    window.localStorage.removeItem("cart");
    window.location.reload();
  };

  const handleIncrement = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const handleDecrement = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const handleChange = (e, itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          quantity: parseInt(e.target.value, 10),
        };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const handleRemoveItem = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  const calculateSubTotal = (item) => {
    return item.pricePerHour * (item.quantity || 1);
  };

  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += calculateSubTotal(item);
    });
    return total;
  };

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
                <button onClick={() => handleDecrement(item.id)}>-</button>
                <input
                  type="number"
                  value={item.quantity || 1}
                  onChange={(e) => handleChange(e, item.id)}
                />
                <button onClick={() => handleIncrement(item.id)}>+</button>
              </div>
              <div>
                <h2>Sub Total: ${calculateSubTotal(item)}</h2>
              </div>
              <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
            </div>
          ))
        ) : (
          <p>No items in the cart</p>
        )}
      </div>
      <div className={style.totalContainer}>
        <h2>Total: ${calculateTotal()}</h2>
        <button> Pagar </button>
      </div>
    </div>
  );
};

export default Cart;

// import { useState } from "react";
// import style from "./Cart.module.css";
// import { useEffect } from "react";
// import { getCart } from "../redux/actions";
// import { useDispatch, useSelector } from "react-redux";

// const Cart = () => {
//   const cartRedux = useSelector((state) => state.cart);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getCart());
//   }, []);

//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     let data = window.localStorage.getItem("cart");
//     if (data) {
//       setCartItems(JSON.parse(data));
//     }
//   }, []);

//   useEffect(() => {
//     window.localStorage.setItem("cart", JSON.stringify(cartItems));
//   }, [cartItems]);

//   const handleCleanCart = () => {
//     window.localStorage.removeItem("cart");
//     window.location.reload();
//   };

//   const handleIncrement = (itemId) => {
//     const updatedCartItems = cartItems.map((item) => {
//       if (item.id === itemId) {
//         return {
//           ...item,
//           quantity: item.quantity + 1,
//         };
//       }
//       return item;
//     });
//     setCartItems(updatedCartItems);
//   };

//   const handleDecrement = (itemId) => {
//     const updatedCartItems = cartItems.map((item) => {
//       if (item.id === itemId && item.quantity > 1) {
//         return {
//           ...item,
//           quantity: item.quantity - 1,
//         };
//       }
//       return item;
//     });
//     setCartItems(updatedCartItems);
//   };

//   const handleChange = (e, itemId) => {
//     const updatedCartItems = cartItems.map((item) => {
//       if (item.id === itemId) {
//         return {
//           ...item,
//           quantity: parseInt(e.target.value, 10),
//         };
//       }
//       return item;
//     });
//     setCartItems(updatedCartItems);
//   };

//   const calculateSubTotal = (item) => {
//     return item.pricePerHour * (item.quantity || 1);
//   };

//   const calculateTotal = () => {
//     let total = 0;
//     cartItems.forEach((item) => {
//       total += calculateSubTotal(item);
//     });
//     return total;
//   };

//   return (
//     <div className={style.container}>
//       <div>
//         <h1 className={style.title}>My Cart</h1>
//         <button onClick={handleCleanCart}>Clean Cart</button>
//       </div>
//       <div className={style.containerService}>
//         {cartItems.length > 0 ? (
//           cartItems.map((item) => (
//             <div className={style.containerCart} key={item.id}>
//               <div>
//                 <h1>{item.nameService}</h1>
//                 <h3>Price Per Hour: ${item.pricePerHour}</h3>
//               </div>
//               <div>
//                 <button onClick={() => handleDecrement(item.id)}>-</button>
//                 <input
//                   type="number"
//                   value={item.quantity || 1}
//                   onChange={(e) => handleChange(e, item.id)}
//                 />
//                 <button onClick={() => handleIncrement(item.id)}>+</button>
//               </div>
//               <div>
//                 <h2>Sub Total: ${calculateSubTotal(item)}</h2>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No items in the cart</p>
//         )}
//       </div>
//       <div className={style.totalContainer}>
//         <h2>Total: ${calculateTotal()}</h2>
//         <button> Pagar </button>
//       </div>
//     </div>
//   );
// };

// export default Cart;

// import { useState } from "react";
// import style from "./Cart.module.css";
// import { useEffect } from "react";
// import { getCart } from "../redux/actions";
// import { useDispatch, useSelector } from "react-redux";

// const Cart = () => {
//   const cartRedux = useSelector((state) => state.cart);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getCart());
//   }, []);

//   // const cartFromLocalStorage = JSON.parse(window.localStorage.getItem("cart"));

//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     let data = window.localStorage.getItem("cart");
//     if (data) {
//       setCartItems(JSON.parse(data));
//     }
//   }, []);

//   useEffect(() => {
//     window.localStorage.setItem("cart", JSON.stringify(cartItems));
//   }, [cartItems]);

//   const handleCleanCart = () => {
//     window.localStorage.removeItem("cart");
//     window.location.reload();
//   };

//   const [suma, setSuma] = useState({
//     value: 1,
//   });

//   const handleChange = (e) => {};

//   return (
//     <div className={style.container}>
//       <div>
//         <h1 className={style.title}>My Cart</h1>
//         <button onClick={handleCleanCart}>Clean Cart</button>
//       </div>
//       <div className={style.containerService}>
//         {cartItems.length > 0 ? (
//           cartItems.map((item) => (
//             <div className={style.containerCart} key={item.id}>
//               <div>
//                 <h1>{item.nameService}</h1>
//                 <h3>Price Per Hour: ${item.pricePerHour}</h3>
//               </div>
//               <div>
//                 <button>-</button>
//                 <span>{suma.value}</span>
//                 <button onChange={handleChange}>+</button>
//               </div>
//               <div>
//                 {" "}
//                 <h2>Sub Total: ${item.pricePerHour} </h2>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No items in the cart</p>
//         )}
//       </div>
//       <div className={style.totalContainer}>
//         {/* <h2>Total: ${total}</h2> */}
//         <button> Pagar </button>
//       </div>
//     </div>
//   );
// };

// export default Cart;
