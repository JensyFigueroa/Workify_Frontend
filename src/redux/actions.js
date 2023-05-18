import { GET_SERVICES, GET_SERVICESBYNAME, GET_SERVICESDETAIL } from "./types";
import axios from "axios";

export const getServices = () => {
  return async (dispatch) => {
    try {
      const response = await axios(
        "https://jsonplaceholder.typicode.com/users"
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
      const response = await axios.get(`/detail/${id}`);
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
