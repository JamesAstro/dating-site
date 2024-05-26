import { configureStore } from "@reduxjs/toolkit";

import signUpReducer from "./reducer/signupSlice";

// export type RootState = ReturnType<typeof rootReducer>

export const store = configureStore({
  reducer: {
    signUp: signUpReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
