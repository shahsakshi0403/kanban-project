import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../pages/login/reducer/reducer";
import taskReducer from "../pages/tasks/reducer/reducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
