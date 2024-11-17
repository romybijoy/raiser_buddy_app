import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { hostname } from "../../config";

const email = localStorage.getItem("email");
const token = localStorage.getItem("token");

export const createOrder = createAsyncThunk(
  "createOrder",
  async (data, { rejectWithValue }) => {
    console.log("data", data);

    try {
      const response = await fetch(`${hostname}/orders/${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data.address),
      });
      if (!response.ok) {
        return rejectWithValue(response.status);
      }

      console.log("created order - ", response);

      const result = await response.json();

      if (result.id) {
        data.navigate({ search: `step=3&order_id=${result.id}` });
      }

      return result;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);


export const createAddress = createAsyncThunk(
  "createAddress",
  async (data, { rejectWithValue }) => {
    console.log("data", data);

    try {
      const response = await fetch(`${hostname}/orders/address/${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data.address),
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
export const showOrder = createAsyncThunk(
  "showOrder",
  async (data, { rejectWithValue }) => {
    console.log(data);
    let response;

    response = await fetch(
      `${hostname}/order?pageNumber=${data.page}&pageSize=${data.pageSize}`,
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

export const codOrder = createAsyncThunk(
  'codOrder',
  async (data, { rejectWithValue, dispatch }) => {
    console.log(data.id)
    const response = await fetch(`${hostname}/orders/cod/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    try {
      const result = await response.json()
      console.log(result)
      return result
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

//read action
export const getOrderHistory = createAsyncThunk(
  "getOrderHistory",
  async (data, { rejectWithValue }) => {
    let response;
    console.log("dsdsfsfs", email);
    try {
      response = await fetch(`${hostname}/orders/user/${email}`, {
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

//update action
export const fetchOrderById = createAsyncThunk(
  "fetchOrderById",
  async (data, { rejectWithValue }) => {
    console.log(data);
    const response = await fetch(`${hostname}/orders/${data.orderId}`, {
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

// cancel order
export const cancelOrder = createAsyncThunk(
  'cancelOrder',
  async (data, { rejectWithValue }) => {
    console.log(data)
    const response = await fetch(`${hostname}/orders/cancel/${data.orderId}?user_id=${data.userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    try {
      const result = await response.json()
      console.log(result)
      return result
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

//delete action
export const deleteOrder = createAsyncThunk(
  "deleteOrder",
  async (id, { rejectWithValue }) => {
    const response = await fetch(`${hostname}/order/${id}`, {
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
export const updateOrder = createAsyncThunk(
  "updateOrder",
  async (data, { rejectWithValue }) => {
    console.log("updated data", data);
    const response = await fetch(`${hostname}/order/${data.id}`, {
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

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    loading: false,
    error: null,
    searchData: [],
    count: 0,
    order: "",
    address: ""
  },

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(createAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.address = action.payload;
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(showOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(showOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.content;
        state.count = action.payload.totalElements;
      })
      .addCase(showOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getOrderHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getOrderHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.orders = [];
      })
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.map((ele) =>
          ele.id === action.payload.id ? action.payload : ele
        );
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(codOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(codOrder.fulfilled, (state, action) => {
        state.loading = false;
        // state.orders = state.orders.map((ele) =>
        //   ele.id === action.payload.id ? action.payload : ele
        // );
      })
      .addCase(codOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;
        
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
  },
});

export default orderSlice.reducer;
