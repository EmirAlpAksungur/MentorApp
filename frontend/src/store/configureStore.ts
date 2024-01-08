import { configureStore, combineReducers, Middleware } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import { checkRedux } from "../services/reducers";
const { logger } = require(`redux-logger`);
export interface RootState {
  checkRedux: any;
}

const middleware: Middleware[] = [thunk, logger];

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["checkRedux"],
};

const rootReducer = combineReducers<RootState>({
  checkRedux: checkRedux,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middleware),
});

// Persistor
export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
