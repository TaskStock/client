import { createApi } from "@reduxjs/toolkit/query/react";
import { myFetchFunction } from "../../myFetchFunction";

export const marketApi = createApi({
  reducerPath: "marketApi",
  baseQuery: myFetchFunction(""),
  tagTypes: ["Market"],
  endpoints: (builder) => ({
    getCategorizedStocks: builder.query({
      query: () => "market/categorized-stocks",
    }),
    getAllStocks: builder.query({
      query: () => "market/all-stocks",
    }),
    getStockDetails: builder.query({
      query: (id: string) => `market/stock-details/${id}`,
    }),
    getAllWishList: builder.query({
      query: () => "market/wishlist",
    }),
    addStockToMyList: builder.mutation({
      query: (id: string) => ({
        url: `market/wishlist/${id}`,
        method: "POST",
      }),
    }),
    addWishList: builder.mutation({
      query: (id: string) => ({
        url: `market/wishlist/${id}`,
        method: "POST",
      }),
    }),
    addLikeToWishItem: builder.mutation({
      query: (id: string) => ({
        url: `market/wishlist/like/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetCategorizedStocksQuery,
  useGetAllStocksQuery,
  useGetStockDetailsQuery,
  useGetAllWishListQuery,
  useAddStockToMyListMutation,
  useAddWishListMutation,
  useAddLikeToWishItemMutation,
} = marketApi;
