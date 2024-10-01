import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slices/UserSlice";
import AuthSlice from "./slices/AuthSlice";
import ProductSlice from "./slices/ProductSlice"
import { ApiSlice } from "./slices/ApiSlice";
import CategorySlice from "./slices/CategorySlice";
import CartSlice from "./slices/CartSlice";

const store = configureStore({
  reducer: {
    [ApiSlice.reducerPath]: ApiSlice.reducer,
    
    app: UserSlice,
    auth: AuthSlice,
    product: ProductSlice,
    category: CategorySlice,
    cart: CartSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false }).concat(ApiSlice.middleware),
  devTools: true,
});


export default store;