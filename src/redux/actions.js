import {
  GET_SERVICES,
  GET_SERVICESBYNAME,
  GET_SERVICESDETAIL,
  ORDER_RESULT,
  FILTER_ITEM,
  CLEAR_FILTER,
} from "./types";
import axios from "axios";

export const getServices = () => {
  return async (dispatch) => {
    try {
      const response = await axios(
        "http://localhost:3001/service/"
      );
      const data = response.data;
      return dispatch({
        type: GET_SERVICES,
        payload: data,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};
export const getServicesByName = (name) => {
  return async (dispatch) => {
    try {
      const response = await axios(`service?name=${name}`);
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

export const filterItem = (selectedItem) => {
  return {
    type: FILTER_ITEM,
    payload: selectedItem,
  };
};

export const clearFilter = () => {
  return {
    type: CLEAR_FILTER,
  };
};
