import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { hostname } from "../../config";

const email = localStorage.getItem("email");
const token = localStorage.getItem("token");

export const createPayment = createAsyncThunk(
  "createPayment",
  async (data, { rejectWithValue }) => {
    console.log("data", data);

    try {
      const response = await fetch(`${hostname}/payments/${data.orderId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // body: JSON.stringify(data.address),
      });
      if (!response.ok) {
        return rejectWithValue(response.status);
      }
     
      const result = await response.json();

      return result;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);


//read action
export const updatePayment = createAsyncThunk(
  "updatePayment",
  async (data, { rejectWithValue }) => {
    console.log(data);
    let response;

    response = await fetch(
      `${hostname}/payments?payment_id=${data.paymentId}&order_id=${data.orderId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    try {
      const result = await response.json();
      // console.log(result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const orderSlice = createSlice({
  name: "payment",
  initialState: {
    loading: false,
    error: null,
    searchData: [],
    payments: "",
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
        window.location.href= action.payload.payment_link_url;
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(updatePayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(updatePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
