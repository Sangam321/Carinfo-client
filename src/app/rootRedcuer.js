import { authApi } from "@/features/api/authApi";
import { carApi } from "@/features/api/carApi";
import { carProgressApi } from "@/features/api/carProgressApi";
import { purchaseApi } from "@/features/api/purchaseApi";
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";

const rootRedcuer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [carApi.reducerPath]: carApi.reducer,
    [purchaseApi.reducerPath]: purchaseApi.reducer,
    [carProgressApi.reducerPath]: carProgressApi.reducer,
    auth: authReducer,
});
export default rootRedcuer;