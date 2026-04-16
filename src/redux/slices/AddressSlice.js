import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { appConfig } from "../../config";

//  GET addresses
export const fetchAddresses = createAsyncThunk(
  "address/fetchAddresses",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${appConfig.ip}/address`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch addresses");
      }

      const data = await res.json();
      console.log(data)
      return data;

    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

//  DELETE address
export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${appConfig.ip}/address/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json(); 
        return rejectWithValue(errorData.message);
      }

      return id;

    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

//  UPDATE address
export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${appConfig.ip}/address/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      return result;

    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
const addressSlice = createSlice({
  name: "address",
  initialState: {
    addresses: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      // 🔹 FETCH
      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 DELETE
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.addresses = state.addresses.filter(
          (a) => a.add_id !== Number(action.payload)
        );
      })

      // 🔹 UPDATE
      .addCase(updateAddress.fulfilled, (state, action) => {
        const index = state.addresses.findIndex(
          (a) => a.add_id === action.payload.add_id
        );
        if (index !== -1) {
          state.addresses[index] = action.payload;
        }
      });
  },
});

export default addressSlice.reducer;