import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { appConfig } from "../../config";

const email = localStorage.getItem("email");
const token = localStorage.getItem("token");

export const addToCart = createAsyncThunk(
  "addToCart",
  async (data, { rejectWithValue, fulfillWithValue, dispatch }) => {
    console.log("data", data.productId);

    try {
      const response = await fetch(`${appConfig.ip}/cart/add/${email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        return rejectWithValue(response);
      }

      const result = await response.json();
      dispatch(showCart());
      console.log(result);
      return fulfillWithValue(result);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

//read action
export const showCart = createAsyncThunk(
  "showCart",
  async (data, { rejectWithValue }) => {
    let response;
    console.log("dsdsfsfs", email);
    try {
      response = await fetch(`${appConfig.ip}/cart/${email}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // if (response.status !== 302) {
      //   return rejectWithValue(response.json());
      // }

      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//delete action
export const removeCartItem = createAsyncThunk(
  "removeCartItem",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      `${appConfig.ip}/cart_items/${email}/${data.cartItemId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    try {
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//update action
export const updateCartItem = createAsyncThunk(
  "updateCartItem",
  async (data, { rejectWithValue, dispatch }) => {
    console.log("updated data", data);
    const response = await fetch(
      `${appConfig.ip}/cart_items/${email}/${data.cartItemId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    try {
      const result = await response.json();
      dispatch(showCart());
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartData: "",
    loading: false,
    error: null,
    searchData: [],
    totalItem: 0,
    cartItems: [],
  },

  reducers: {
    searchUser: (state, action) => {
      console.log(action.payload);
      state.searchData = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        //state.cart = action.payload.cart;
        // state.count = action.payload.cart.totalItem;
        // state.carts.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(showCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(showCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartData = action.payload;
        state.totalItem = action.payload.totalItem;
      })
      .addCase(showCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      .addCase(removeCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        // state.carts = state.carts.map((ele) =>
        //   ele.id == action.payload.id ? action.payload : ele
        // );
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default cartSlice.reducer;
