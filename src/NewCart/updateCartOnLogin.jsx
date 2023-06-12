import axios from "axios";

const UpdateCartOnLogin = async (uid) => {
  const cartDB = (await axios.get(`/user/getCart/${uid}`)).data;
  const cartLS = JSON.parse(window.localStorage.getItem("cartItems")) || [];

  const services = {};

  cartDB.forEach((ele) => {
    if (services[ele.id]) {
      services[ele.id].quantity += ele.quantity;
    } else {
      services[ele.id] = { ...ele };
    }
  });

  cartLS.forEach((ele) => {
    if (services[ele.id]) {
      services[ele.id].quantity += ele.quantity;
    } else {
      services[ele.id] = { ...ele };
    }
  });

  const mergedServices = Object.values(services);

  window.localStorage.setItem("cartItems", JSON.stringify(mergedServices));
};

export default UpdateCartOnLogin;
