import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from "./reducer";
import thunk from "redux-thunk";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['currentUserIdLoggedIn','currentUserNameLoggedIn'],
};

const middleware = [thunk];
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Combinar los enhancers con la función compose
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Utilizar composeEnhancers para combinar los enhancers y crear el store
const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

const persistor = persistStore(store);

export { store, persistor };

