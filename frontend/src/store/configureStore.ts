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
  blog,
  languages,
  signup,
  login,
  notification,
  chat,
  theme,
  changePassword,
  about,
  personalInfo,
  knownSkills,
} from "../services/reducers";
const { logger } = require(`redux-logger`);
export interface RootState {
  auth: any;
  blog: any;
  languages: any;
  signup: any;
  login: any;
  notification: any;
  chat: any;
  theme: any;
  changePassword: any;
  about: any;
  personalInfo: any;
  knownSkills: any;
  [key: string]: any;
}

const middleware: Middleware[] = [thunk, logger];

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["languages", "theme"],
};

const rootReducer = combineReducers<RootState>({
  auth: auth,
  blog: blog,
  languages: languages,
  signup: signup,
  login: login,
  notification: notification,
  chat: chat,
  theme: theme,
  changePassword: changePassword,
  about: about,
  personalInfo: personalInfo,
  knownSkills: knownSkills,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middleware),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
