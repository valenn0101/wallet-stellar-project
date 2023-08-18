import { configureStore } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { CUSTOM_TOAST_STYLE, TOAST_ALERT_MESSAGE } from "../utils/constants";

const initialState = {
  publicKey: null,
  session: false,
};

const rootReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...state,
        publicKey: action.payload.publicKey,
        session: true
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

const sessionStore = configureStore({
  reducer: rootReducer,
});

export default  sessionStore ;