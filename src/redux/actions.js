import { toast } from "react-hot-toast";
import {
  GET_SERVICES,
  GET_SERVICESBYNAME,
  GET_SERVICESDETAIL,
  ORDER_RESULT,
  SELECT_ITEM,
  SELECT_LOCATION,
  CLEAR_FILTER,
  CLEAN_DETAIL,
  ADD_SERVICE_IN_CART,
  GET_CART,
  UPDATE_CART,
  LOGIN_USER,
  CLEAN_SEARCH,
  SET_CART,
  GET_USER,
  GETCART_DATABASE,
  SEND_CART,
  ADMIN,
  CLEAN_ADMIN,
} from "./types";
import axios from "axios";

export const getServices = () => {
  return async (dispatch) => {
    try {
      console.log("entre en la action de getservices");
      const response = await axios.get("/service/");
      const data = response.data;
      return dispatch({
        type: GET_SERVICES,
        payload: data,
      });
    } catch (error) {
      //throw new Error(error.message);
      console.log("entre en la action de getservices pero en el ERROR");
      console.log(error.message);
    }
  };
};

export const getServicesByName = (name) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/service/name?name=${name}`);
      const data = response.data;
      return dispatch({
        type: GET_SERVICESBYNAME,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
      // throw new Error(error.message);
    }
  };
};

export const getServiceDetail = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/service/${id}`);
      const data = response.data;
      return dispatch({
        type: GET_SERVICESDETAIL,
        payload: data,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const getUser = (idUser) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/user/${idUser}`);
      const data = response.data;
      return dispatch({
        type: GET_USER,
        payload: data,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const orderResult = (orderBy, orderType) => {
  console.log(orderBy, orderType, "orderBy, orderType en action");
  return {
    type: ORDER_RESULT,
    payload: {
      orderBy,
      orderType,
    },
  };
};

export const selectItem = (items) => {
  console.log(items, "items en actions");
  return {
    type: SELECT_ITEM,
    payload: items,
  };
};

export const selectLocation = (location) => {
  console.log(location, "location en actions");
  return {
    type: SELECT_LOCATION,
    payload: location,
  };
};

export const clearFilter = () => {
  return {
    type: CLEAR_FILTER,
  };
};

export const cleanDetail = () => {
  return {
    type: CLEAN_DETAIL,
  };
};

export const loginUser = (uid, name, userPhone, userEmail, imgUrl) => {
  // console.log(uid, name, userPhone, "action");
  return {
    type: LOGIN_USER,
    payload: [uid, name, userPhone, userEmail, imgUrl],
  };
};

export const cleanSearch = () => {
  return {
    type: CLEAN_SEARCH,
  };
};

export const addToCart = (product) => {
  return (dispatch) => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += product.quantity;
    } else {
      cartItems.push(product);
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    dispatch(sendCart(cartItems));
    toast.success("Service successfully added");
  };
};

export const sendCart = (cart) => {
  return {
    type: SEND_CART,
    payload: cart,
  };
};

export const getAdmin = (obj) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("user/admin", obj);
      return dispatch({
        type: ADMIN,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const cleanAdmin = () => {
  return {
    type: CLEAN_ADMIN,
  };
};
