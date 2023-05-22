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
  orderBy: "name",
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
      const sortedResults = [...state.allServices].sort((a, b) => {
        //ascendentemente o descendentemente?
        const order = orderType === "up" ? 1 : -1;

        if (orderBy === "nameService") {
          if (a[orderBy] > b[orderBy]) {
            //ascendente
            return order;
          }
          if (a[orderBy] < b[orderBy]) {
            //descendente
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
