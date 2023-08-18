import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  publicKey: "",
};

const rootReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...state,
        publicKey: action.payload.publicKey,
      };
    case "SIGN_OUT":
      return initialState;
    default:
      return state;
  }
};

const sessionStore = configureStore({
  reducer: rootReducer,
});

export default  sessionStore ;