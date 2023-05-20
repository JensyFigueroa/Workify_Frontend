import {
  GET_SERVICES,
  GET_SERVICESBYNAME,
  GET_SERVICESDETAIL,
  ORDER_RESULT,
  SELECT_LOCATION,
  SELECT_ITEM,
  CLEAR_FILTER,
} from "./types";

const initialState = {
  allServices: [],
  allServicesCache: [],
  allItems: [],
  allCountries: [],
  allCities: [],
  serviceDetail: {},
  selectedItem: null,
  selectedLocation: null,
  orderBy: "rating",
  orderType: "up",
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
      console.log(services);
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
        let items = state.allServices.filter(
          (service) => service.location.ciudad === action.payload
        );
        return {
          ...state,
          selectedLocation: null,
          allServices: items,
        };
      }

      state.allServices = state.allServicesCache;
      let location = state.allServices.filter(
        (service) => service.location.ciudad === action.payload
      );
      if (state.selectedItem)
        location.filter(
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
      if (action.payload === "ALL" && state.selectedItem) {
        let items = state.allServices.filter(
          (service) => service.location.ciudad === action.payload
        );
        return {
          ...state,
          selectedItem: null,
          allServices: items,
        };
      }

      state.allServices = state.allServicesCache;
      let service = state.allServices.filter(
        (service) => service.typeService === action.payload
      );
      if (state.selectedLocation) {
        service.filter((service) => service.location.ciudad === action.payload);
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
        orderBy: "rating",
        orderType: "up",
        selectedItem: null,
        selectedLocation: null,
      };

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
