import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { appConfig } from '../../config'

const token = localStorage.getItem('token')

export const createCoupon = createAsyncThunk(
  'createCoupon',
  async (data, { rejectWithValue, fulfillWithValue, dispatch }) => {
    console.log('data', data)

    try {
      const response = await fetch(`${appConfig.ip}/coupon`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        return rejectWithValue(response.status)
      }

      const result = await response.json()
      return fulfillWithValue(result)
    } catch (error) {
      console.log(error)
      return rejectWithValue(error)
    }
  },
)

//read action
export const showCoupon = createAsyncThunk('showCoupon', async (data, { rejectWithValue }) => {
  console.log(data)
  let response
  try {
    response = await fetch(
      `${appConfig.ip}/coupon`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    if (response.status !== 302) {
      return rejectWithValue(response.json())
    }

    const result = await response.json()
    // console.log(result);
    return result
  } catch (error) {
    return rejectWithValue(error)
  }
})


//delete action
export const deleteCoupon = createAsyncThunk(
  'deleteCoupon',
  async (id, { rejectWithValue, dispatch }) => {
    const response = await fetch(`${appConfig.ip}/coupon/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    try {
      const result = await response.json()
      console.log(result)
      dispatch(showCoupon({ page: 0, pageSize: 5 }))
      return result
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

//read action
export const validateCoupon = createAsyncThunk('validateCoupon', async (data, { rejectWithValue }) => {
  console.log(data)
  let response
  try {
    response = await fetch(
      `${appConfig.ip}/coupon/${data.code[0].text}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    // if (response.status !== 302) {
    //   return rejectWithValue(response.json())
    // }

    const result = await response.json()
    // console.log(result);
    return result
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const couponSlice = createSlice({
  name: 'coupon',
  initialState: {
    coupons: [],
    loading: false,
    error: null,
    searchData: [],
    count: 0,
    coupon: "",
  },

  reducers: {
    
  },

  extraReducers: (builder) => {
    builder

      .addCase(createCoupon.pending, (state) => {
        state.loading = true
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.loading = false
        // state.categories.push(action.payload);
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(showCoupon.pending, (state) => {
        state.loading = true
      })
      .addCase(showCoupon.fulfilled, (state, action) => {
        state.loading = false
        state.coupons = action.payload.content
        state.count = action.payload.totalElements
      })
      .addCase(showCoupon.rejected, (state, action) => {
        state.loading = false
        state.coupons = []
        state.error = action.payload.message
      })
      .addCase(validateCoupon.pending, (state) => {
        state.loading = true
      })
      .addCase(validateCoupon.fulfilled, (state, action) => {
        state.loading = false
        state.coupon = action.payload
      })
      .addCase(validateCoupon.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.message
      })
      .addCase(deleteCoupon.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default couponSlice.reducer

