import { authApi } from "@/features/api/authApi";
import { carApi } from "@/features/api/carApi";
import { carProgressApi } from "@/features/api/carProgressApi";
import { purchaseApi } from "@/features/api/purchaseApi";
import { configureStore } from "@reduxjs/toolkit";
import rootRedcuer from "./rootRedcuer";

export const appStore = configureStore({
    reducer: rootRedcuer,
    middleware: (defaultMiddleware) => defaultMiddleware().concat(authApi.middleware, carApi.middleware, purchaseApi.middleware, carProgressApi.middleware)
});

const initializeApp = async () => {
    await appStore.dispatch(authApi.endpoints.loadUser.initiate({}, { forceRefetch: true }))
}
initializeApp();