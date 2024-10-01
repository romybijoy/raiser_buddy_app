import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { hostname } from "../../config";

const token = localStorage.getItem("token");

export const createCategory = createAsyncThunk(
  "createCategory",
  async (data, { rejectWithValue }) => {
    console.log("data", data);

    try {
      const response = await fetch(`${hostname}/category`, {
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
export const showCategory = createAsyncThunk(
  "showCategory",
  async (data, { rejectWithValue }) => {
    console.log(data);
    let response;
    
      response = await fetch(
          `${hostname}/category?pageNumber=${data.page}&pageSize=${data.pageSize}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      
    try {
      const result = await response.json();
      // console.log(result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


//update action
export const fetchCategoryById = createAsyncThunk(
  "fetchCategoryById",
  async (id, { rejectWithValue }) => {
    const response = await fetch(`${hostname}/category/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    try {
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//delete action
export const deleteCategory = createAsyncThunk(
  "deleteCategory",
  async (id, { rejectWithValue }) => {
    const response = await fetch(`${hostname}/category/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

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
export const updateCategory = createAsyncThunk(
  "updateCategory",
  async (data, { rejectWithValue }) => {
    console.log("updated data", data);
    const response = await fetch(`${hostname}/category/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const categoryDetail = createSlice({
  name: "categoryDetail",
  initialState: {
    categories: [],
    loading: false,
    error: null,
    searchData: [],
    count:0
  },

  reducers: {
    searchUser: (state, action) => {
      console.log(action.payload);
      state.searchData = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      
    .addCase(createCategory.pending, (state) => {
      state.loading = true;
    })
    .addCase(createCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.categories.push(action.payload);
    })
    .addCase(createCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    })
      .addCase(showCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(showCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.content;
        state.count = action.payload.totalElements;
      })
      .addCase(showCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
    .addCase(fetchCategoryById.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchCategoryById.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action.payload.category;
    })
    .addCase(fetchCategoryById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    })
    .addCase(deleteCategory.pending, (state) => {
      state.loading = true;
    })
    .addCase(deleteCategory.fulfilled, (state, action) => {
      state.loading = false;
    })
    .addCase(deleteCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase(updateCategory.pending, (state) => {
      state.loading = true;
    })
    .addCase(updateCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = state.categories.map((ele) =>
        ele.id == action.payload.id ? action.payload : ele
      );
    })
    .addCase(updateCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    })
  },
});

export default categoryDetail.reducer;

export const { searchUser } = categoryDetail.actions;
