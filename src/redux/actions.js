import {
  GET_SERVICES,
  GET_SERVICESBYNAME,
  GET_SERVICESDETAIL,
  ORDER_RESULT,
  SELECT_ITEM,
  SELECT_LOCATION,
  CLEAR_FILTER,
  CLEAN_DETAIL,
} from "./types";
import axios from "axios";

export const getServices = () => {
  return async (dispatch) => {
    try {
      const response = await axios("http://localhost:3001/service/");
      const data = response.data;
      return dispatch({
        type: GET_SERVICES,
        payload: data,
      });
    } catch (error) {
      //throw new Error(error.message);
      console.log(error.message);
    }
  };
};

export const getServicesByName = (name) => {
  return async (dispatch) => {
    try {
      const response = await axios(
        `http://localhost:3001/service/name?name=${name}`
      );
      const data = response.data;
      return dispatch({
        type: GET_SERVICESBYNAME,
        payload: data,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const getServiceDetail = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/service/${id}`);
      const data = response.data;
      console.log(data, "action");
      return dispatch({
        type: GET_SERVICESDETAIL,
        payload: data,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const orderResult = (orderBy, orderType) => {
  return {
    type: ORDER_RESULT,
    payload: {
      orderBy,
      orderType,
    },
  };
};

export const selectItem = (items) => {
  return {
    type: SELECT_ITEM,
    payload: items,
  };
};

export const selectLocation = (location) => {
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
