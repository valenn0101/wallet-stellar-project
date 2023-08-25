import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

const setupInactivityReset = (
  store: ToolkitStore,
  inactivityTimeoutInMs: number
) => {
  let inactivityTimer: NodeJS.Timeout;

  const resetState = () => {
    store.dispatch({ type: "SIGN_OUT" });
    window.location.replace("/");
  };

  const resetTimer = () => {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(resetState, inactivityTimeoutInMs);
  };

  const eventsToResetTimer = ["mousedown", "keydown", "touchstart"];
  eventsToResetTimer.forEach(event => {
    document.addEventListener(event, resetTimer);
  });

  resetTimer();
};

export default setupInactivityReset;