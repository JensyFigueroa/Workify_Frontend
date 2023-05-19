import {
  GET_SERVICES,
  GET_SERVICESBYNAME,
  GET_SERVICESDETAIL,
  ORDER_RESULT,
  FILTER_ITEM,
  CLEAR_FILTER,
} from "./types";

const initialState = {
  allServices: [],
  serviceDetail: {},
  orderBy: "rating",
  orderType: "up",
  filterItem: "",
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

    case ORDER_RESULT:
      const { orderBy, orderType } = action.payload;
      const sortedResults = [...state.results].sort((a, b) => {
        //ascendentemente o descendentemente?
        const order = orderType === "up" ? 1 : -1;

        if (orderBy === "name") {
          if (a[orderBy] > b[orderBy]) {
            //ascendente
            return order;
          }
          if (a[orderBy] < b[orderBy]) {
            //descendente
            return -order;
          }
          return 0;
        } else if (orderBy === "rating") {
          if (a[orderBy] > b[orderBy]) {
            return -order;
          }
          if (a[orderBy] < b[orderBy]) {
            return order;
          }
          return 0;
        }
        return 0;
      });
      return {
        ...state,
        //falta aplicarselo a las cards e igualarlo a sortedResults
        orderBy,
        orderType,
      };

    case FILTER_ITEM:
      let filterItem = [];
      if (action.payload === "") {
        return {
          ...state,
          //copyAllServices: allServices,
        };
      }
      const { selectedItem } = action.payload;

      filterItem = state.allServices.filter(
        (service) => service.name === selectedItem
      );

      return {
        ...state,
        filterItem: selectedItem,
        //copyAllServices: filterItem,
      };

    case CLEAR_FILTER:
      return {
        ...state,
      };

    default:
      return {
        ...state,
        //copyAllServices: allServices,
        orderBy: "rating",
        orderType: "up",
        filterItem: "",
      };
  }
};

export default rootReducer;
