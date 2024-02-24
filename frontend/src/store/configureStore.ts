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

import {
  auth,
  languages,
  signup,
  login,
  notification,
  firstLogin,
  chat,
} from "../services/reducers";
const { logger } = require(`redux-logger`);
export interface RootState {
  auth: any;
  languages: any;
  signup: any;
  login: any;
  notification: any;
  firstLogin: any;
  chat: any;
  [key: string]: any;
}

const middleware: Middleware[] = [thunk, logger];

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers<RootState>({
  auth: auth,
  languages: languages,
  signup: signup,
  login: login,
  notification: notification,
  firstLogin: firstLogin,
  chat: chat,
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
