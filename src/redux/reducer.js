import { GET_SERVICES, GET_SERVICESBYNAME, GET_SERVICESDETAIL } from "./types";

const initialState = {
  allServices: [],
  serviceDetail: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SERVICES:
      return {
        ...state,
        allServices: action.payload,
      };
    case GET_SERVICESBYNAME:
      return {
        ...state,
        allServices: action.payload,
      };
    case GET_SERVICESDETAIL:
      return {
        ...state,
        serviceDetail: action.payload,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
