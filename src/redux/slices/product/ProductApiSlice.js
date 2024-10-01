import { ApiSlice } from "../ApiSlice";

export const ProductApiSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchProducts: builder.mutation({
      query: (token) => ({
        url: `/product?keyword=`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        validateStatus: (response, result) =>
          response.status === 200 && !result.isError
      }),
    }),
    fetchProduct: builder.query({
      query: (token,id) => ({
        url: `/product/${id}`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    // register: builder.mutation({
    //   query: (data) => ({
    //     url: `${USERS_URL}`,
    //     method: 'POST',
    //     body: data,
    //   }),
    // }),
    // updateUser: builder.mutation({
    //   query: (data) => ({
    //     url: `${USERS_URL}/profile`,
    //     method: 'PUT',
    //     body: data,
    //   }),
    // }),
  }),
});

export const {
  useFetchProductsMutation,
  useFetchProductQuery,
} = ProductApiSlice;
