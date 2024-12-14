import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { appConfig } from "../../config";

export const fetchInvoice = createAsyncThunk(
  "fetchInvoice",
  async (invoiceId) => {
    const response = await fetch(`${appConfig.ip}/invoice/${invoiceId}/download`);
    if (!response.ok) {
      throw new Error("Failed to fetch invoice");
    }
    const blob = await response.blob();
    return URL.createObjectURL(new Blob([blob]));
  }
);

const invoiceSlice = createSlice({
  name: "invoices",
  initialState: {
    invoiceUrl: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.invoiceUrl = action.payload;
      })
      .addCase(fetchInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default invoiceSlice.reducer;
