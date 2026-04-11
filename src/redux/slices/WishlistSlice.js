import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { appConfig } from "../../config";
import { toast } from "react-toastify";

const token = localStorage.getItem("token");

export const createWishlist = createAsyncThunk(
  "createWishlist",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `${appConfig.ip}/wishlist/${data.userId}/${data.productId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        return rejectWithValue(response.status);
      }

      const result = await response.json();
      dispatch(showWishlist(data.userId));
      toast.success("Product Added to Wishlist Successfully");
      return result;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

//read action
export const showWishlist = createAsyncThunk(
  "showWishlist",
  async (userId, { rejectWithValue }) => {
    let response;
    response = await fetch(`${appConfig.ip}/wishlist/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    try {
      const result = await response.json();
      return Array.isArray(result) ? result : [];
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteWishlist = createAsyncThunk(
  "deleteWishlist",
  async (data, { rejectWithValue, dispatch, fulfillWithValue }) => {
    try {
      const response = await fetch(
        `${appConfig.ip}/wishlist/${data.userId}/${data.productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      console.log(response);
      if (response.ok) {
        dispatch(showWishlist(data.userId));
        
      toast.success("Product Removed from Wishlist Successfully");
        return fulfillWithValue(response.status);
      }

      return result;
    } catch (error) {
      console.log("first");
      return rejectWithValue(error);
    }
  }
);

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
    loading: false,
    error: null,
    searchData: [],
    count: 0,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(createWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(createWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload.wishlists;
      })
      .addCase(createWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      })
      .addCase(showWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(showWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = Array.isArray(action.payload) ? action.payload : [];
state.count = state.wishlist.length;
      })
      .addCase(showWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteWishlist.fulfilled, (state, action) => {
        state.loading = false;
        if(action.payload === 200){
        state.wishlist = [];
        }
      })
      .addCase(deleteWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default wishlistSlice.reducer;
