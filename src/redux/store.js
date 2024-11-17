import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slices/UserSlice";
import AuthSlice from "./slices/AuthSlice";
import ProductSlice from "./slices/ProductSlice";
import { ApiSlice } from "./slices/ApiSlice";
import CategorySlice from "./slices/CategorySlice";
import CartSlice from "./slices/CartSlice";
import OrderSlice from "./slices/OrderSlice";
import ReviewSlice from "./slices/ReviewSlice";
import PaymentSlice from "./slices/PaymentSlice";
import WishlistSlice from "./slices/WishlistSlice";
import CouponSlice from "./slices/CouponSlice";
import InvoiceSlice from "./slices/InvoiceSlice";

const store = configureStore({
  reducer: {
    [ApiSlice.reducerPath]: ApiSlice.reducer,

    app: UserSlice,
    auth: AuthSlice,
    product: ProductSlice,
    category: CategorySlice,
    cart: CartSlice,
    order: OrderSlice,
    review: ReviewSlice,
    payment: PaymentSlice,
    wishlist: WishlistSlice,
    coupon: CouponSlice,
    invoices: InvoiceSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      ApiSlice.middleware
    ),
  devTools: true,
});

export default store;
