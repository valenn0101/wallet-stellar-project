import { configureStore } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { toast } from "react-toastify";

import  setupInactivityReset from "../utils/inactivityReset";
import { CUSTOM_TOAST_STYLE, DELAY_IN_MILLISECONDS, TOAST_ALERT_MESSAGE } from "../utils/constants";

const initialState = {
  publicKey: null,
  session: false,
  lastActivityTimestamp: Date.now(),
};

const rootReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...state,
        publicKey: action.payload.publicKey,
        session: true,
        lastActivityTimestamp: Date.now(),
      };
    case "SIGN_OUT":
    toast.info(TOAST_ALERT_MESSAGE.signOut, {
        style: {
            background: CUSTOM_TOAST_STYLE.alertBackground,
            color: CUSTOM_TOAST_STYLE.fontColor,
        },
        progressStyle: {
            background: CUSTOM_TOAST_STYLE.progressBackground,
        },
        });
      return initialState;
    default:
      return state;
  }
};

const persistConfig = {
  key: "root",
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sessionStore: ToolkitStore = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(sessionStore);

setupInactivityReset(sessionStore, DELAY_IN_MILLISECONDS.DELAY_FOR_INACTIVITY_RESET);

export { persistor, sessionStore };