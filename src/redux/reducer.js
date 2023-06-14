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
  SET_CART,
  GET_USER,
  GETCART_DATABASE,
  SEND_CART,
  ADMIN,
  CLEAN_ADMIN,
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
  currentUserNameLoggedIn: ["", "", "", ""],
  userInfo: [],
  admin: {},
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
        allServices: action.payload,
      };
    case GET_SERVICESDETAIL:
      return {
        ...state,
        serviceDetail: action.payload,
      };

    case GET_USER:
      return {
        ...state,
        userInfo: action.payload,
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
            return order;
          }
          if (a[orderBy] < b[orderBy]) {
            return -order;
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
        } else if (orderBy === "rating") {
          console.log("rating en reducer");
          const accRating =
            a.reviews?.length > 0
              ? a.reviews
                  .map((review) => parseFloat(review.rating))
                  .reduce((a, b) => (!isNaN(a) ? a : 0) + (!isNaN(b) ? b : 0))
              : 0;
          const aRating = accRating / a.reviews?.length;
          const bccRating =
            b.reviews?.length > 0
              ? b.reviews
                  .map((review) => parseFloat(review.rating))
                  .reduce((a, b) => (!isNaN(a) ? a : 0) + (!isNaN(b) ? b : 0))
              : 0;
          const bRating = bccRating / b.reviews?.length;

          if (aRating > bRating) {
            return -order;
          }
          if (aRating < bRating) {
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

    case LOGIN_USER:
      return {
        ...state,
        currentUserIdLoggedIn: action.payload[0],
        currentUserNameLoggedIn: [
          action.payload[1],
          action.payload[3],
          action.payload[2],
          action.payload[4],
        ],
      };
    case CLEAN_SEARCH:
      return {
        ...state,
        searchServices: [],
      };

    case SEND_CART:
      return {
        ...state,
        cart: action.payload,
      };

    case ADMIN:
      return {
        ...state,
        admin: action.payload,
      };
    case CLEAN_ADMIN:
      return {
        ...state,
        admin: {},
      };

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
