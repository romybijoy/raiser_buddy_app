import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { hostname } from "../../config";

const token = localStorage.getItem("token");
const email = localStorage.getItem("email");

export const createReview = createAsyncThunk(
  "createReview",
  async (data, { rejectWithValue }) => {
    console.log("data", data);

    try {
      const response = await fetch(`${hostname}/review/create/${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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
export const showReviews = createAsyncThunk(
  "showReviews",
  async (data, { rejectWithValue }) => {
    console.log(data);
    let response;

    response = await fetch(`${hostname}/review/product/${data.productId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    try {
      const result = await response.json();
      // console.log(result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createRating = createAsyncThunk(
  "createRating",
  async (data, { rejectWithValue }) => {
    console.log("data", data);

    try {
      const response = await fetch(`${hostname}/ratings/create/${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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
export const showRating = createAsyncThunk(
  "showRating",
  async (data, { rejectWithValue }) => {
    console.log(data);
    let response;

    response = await fetch(`${hostname}/ratings/product/${data}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    try {
      const result = await response.json();
      // console.log(result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const reviewSlice = createSlice({
  name: "review",
  initialState: {
    ratings: [],
    reviews: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(createReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;
        
        console.log(action.payload)
        // state.reviews.push(action.payload);
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(showReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(showReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(showReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createRating.pending, (state) => {
        state.loading = true;
      })
      .addCase(createRating.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload)
        state.reviews.push(action.payload);
      })
      .addCase(createRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(showRating.pending, (state) => {
        state.loading = true;
      })
      .addCase(showRating.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(showRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reviewSlice.reducer;
