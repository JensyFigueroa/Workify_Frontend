import { toast } from "react-hot-toast";
import {
  GET_SERVICES,
  GET_SERVICESBYNAME,
  GET_SERVICESDETAIL,
  ORDER_RESULT,
  SELECT_LOCATION,
  SELECT_ITEM,
  CLEAR_FILTER,
  CLEAN_DETAIL,
  ADD_SERVICE_IN_CART,
  GET_CART,
  UPDATE_CART,
  LOGIN_USER,
  CLEAN_SEARCH,
} from "./types";

const initialState = {
  allServices: [],
  allServicesCache: [],
  searchServices: [],
  allItems: [],
  allCountries: [],
  allCities: [],
  serviceDetail: {},
  selectedItem: null,
  selectedLocation: null,
  orderBy: "name",
  orderType: "up",
  cart: [],
  currentUserIdLoggedIn: "",
  currentUserNameLoggedIn: ["",""],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SERVICES:
      let services = action.payload;

      const items = Array.from(
        new Set(services.map((service) => service.typeService))
      );

      const countries = Array.from(
        new Set(services.map((service) => service.location.pais))
      );

      const cities = Array.from(
        new Set(services.map((service) => service.location.ciudad))
      );

      return {
        ...state,
        allServices: services,
        allServicesCache: services,
        allItems: items,
        allCountries: countries,
        allCities: cities,
      };
    case GET_SERVICESBYNAME:
      return {
        ...state,
        searchServices: action.payload,
      };
    case GET_SERVICESDETAIL:
      return {
        ...state,
        serviceDetail: action.payload,
      };

    case ORDER_RESULT:
      const { orderBy, orderType } = action.payload;
      const sortedResults = [...state.allServices].sort((a, b) => {
        const order = orderType === "up" ? 1 : -1;

        if (orderBy === "nameService") {
          if (a[orderBy] > b[orderBy]) {
            return order;
          }
          if (a[orderBy] < b[orderBy]) {
            return -order;
          }
          return 0;
        } else if (orderBy === "typeService") {
          if (a[orderBy] > b[orderBy]) {
            return -order;
          }
          if (a[orderBy] < b[orderBy]) {
            return order;
          }
          return 0;
        } else if (orderBy === "pricePerHour") {
          if (a[orderBy] > b[orderBy]) {
            return -order;
          }
          if (a[orderBy] < b[orderBy]) {
            return order;
          }
          return 0;
        } else if (orderBy === "reviews") {
          if (a[orderBy] > b[orderBy]) {
            return -order;
          }
          if (a[orderBy] < b[orderBy]) {
            return order;
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
        allServices: sortedResults,
        orderBy,
        orderType,
      };

    case SELECT_LOCATION:
      if (
        action.payload === "ALL" &&
        (!state.selectedItem || state.selectedItem === "ALL")
      ) {
        return {
          ...state,
          selectedLocation: null,
          allServices: state.allServicesCache,
        };
      }
      if (action.payload === "ALL" && state.selectedItem) {
        let items = state.allServicesCache.filter(
          (service) => service.typeService === state.selectedItem
        );
        return {
          ...state,
          selectedLocation: null,
          allServices: items,
        };
      }

      let location = state.allServicesCache.filter(
        (service) => service.location.ciudad === action.payload
      );
      if (state.selectedItem && state.selectedItem !== "ALL")
        location = location.filter(
          (service) => service.typeService === state.selectedItem
        );

      return {
        ...state,
        selectedLocation: action.payload,
        allServices: location,
      };

    case SELECT_ITEM:
      if (
        action.payload === "ALL" &&
        (!state.selectedLocation || state.selectedLocation === "ALL")
      ) {
        return {
          ...state,
          selectedItem: null,
          allServices: state.allServicesCache,
        };
      }
      if (action.payload === "ALL" && state.selectedLocation) {
        let items = state.allServicesCache.filter(
          (service) => service.location.ciudad === state.selectedLocation
        );

        return {
          ...state,
          selectedItem: null,
          allServices: items,
        };
      }

      let service = state.allServicesCache.filter(
        (service) => service.typeService === action.payload
      );

      if (state.selectedLocation && state.selectedLocation !== "ALL") {
        service = service.filter(
          (service) => service.location.ciudad === state.selectedLocation
        );
      }
      return {
        ...state,
        selectedItem: action.payload,
        allServices: service,
      };

    case CLEAR_FILTER:
      return {
        ...state,
        allServices: state.allServicesCache,
        orderBy: "nameService",
        orderType: "up",
        selectedItem: "ALL",
        selectedLocation: "ALL",
      };

    case CLEAN_DETAIL:
      return {
        ...state,
        serviceDetail: {},
      };

    case ADD_SERVICE_IN_CART:
      action.payload.quantity = 1;

      const inServ = (e) => e.id === action.payload.id;

      if (state.cart.some(inServ)) {
        toast.error("This product is already in your cart!");
        return {
          ...state,
        };
      }

      let data = [...state.cart, action.payload];

      window.localStorage.setItem("cart", JSON.stringify(data));
      toast.success("Product added to cart!");
      return {
        ...state,
        cart: data,
      };
    case GET_CART:
      return {
        ...state,
        cart: [...state.cart],
      };

    case UPDATE_CART:
      console.log(action.payload, "update reducer");
      return {
        ...state,
        cart: action.payload,
      };
    case LOGIN_USER:
      return {
        ...state,
        currentUserIdLoggedIn: action.payload[0],
        currentUserNameLoggedIn: [action.payload[1],action.payload[2]]
      };
    case CLEAN_SEARCH:
      return {
        ...state,
        searchServices: [],
      };

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
