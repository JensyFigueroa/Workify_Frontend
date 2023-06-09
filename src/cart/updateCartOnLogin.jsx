import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const UpdateCartOnLogin = () => {
  // const uid = useSelector((state) => state.currentUserIdLoggedIn);
  // console.log(uid);
  // useEffect(() => {
  //   const updateCart = async () => {
  //     const cartDB = (await axios.get(`/user/getCart/${uid}`)).data;
  //     const cartLS = JSON.parse(window.localStorage.getItem("cartItems"));
  //     const services = {};
  //     cartDB.forEach((ele) => {
  //       if (services[ele.id]) {
  //         services[ele.id].quantity += ele.quantity;
  //       } else {
  //         services[ele.id] = { ...ele };
  //       }
  //     });
  //     cartLS.forEach((ele) => {
  //       if (services[ele.id]) {
  //         services[ele.id].quantity += ele.quantity;
  //       } else {
  //         services[ele.id] = { ...ele };
  //       }
  //     });
  //     const mergedServices = Object.values(services);
  //     console.log(mergedServices);
  //     window.localStorage.setItem("cartItems", JSON.stringify(mergedServices));
  //   };
  //   if (uid) {
  //     updateCart();
  //   }
  // }, [uid]);
  // return null;
};

export default UpdateCartOnLogin;
