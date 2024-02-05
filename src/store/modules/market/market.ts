import { createApi } from "@reduxjs/toolkit/query/react";
import { myFetchFunction } from "../../myFetchFunction";
import { StockItem, StockDetail } from "../../../@types/stock";
import { Wish } from "../../../@types/wish";

export const marketApi = createApi({
  reducerPath: "marketApi",
  baseQuery: myFetchFunction(""),
  tagTypes: ["Market"],
  endpoints: (builder) => ({
    getCategorizedStocks: builder.query({
      query: () => "market/categorized-stocks",
    }),
    getAllStocks: builder.query<
      {
        stockitems: StockItem[];
      },
      void
    >({
      query: () => ({ url: "/siuser/all", method: "GET" }),
    }),
    getStockDetails: builder.query<
      {
        stockitems: StockDetail;
      },
      {
        id: number;
      }
    >({
      query: ({ id }) => {
        return { url: `/siuser/detail/${id}`, method: "GET" };
      },
    }),
    getAllWishList: builder.query<
      {
        wishlist: Wish[];
      },
      {
        offset: number;
        limit: number;
        filter: "like" | "latest";
      }
    >({
      query: ({ offset, limit, filter }) => {
        return {
          url: `/wishlist?offset=${offset}&limit=${limit}&filter=${filter}`,
          method: "GET",
        };
      },
    }),
    addWishList: builder.mutation<
      {
        result: string;
      },
      {
        name: string;
      }
    >({
      query: () => ({
        url: `/wishlist`,
        method: "POST",
      }),
    }),
    toggleLikeWishItem: builder.mutation<
      {
        result: string;
      },
      {
        wishlist_id: number;
      }
    >({
      query: ({ wishlist_id }) => ({
        url: `/wishlist/liketoggle`,
        method: "POST",
        body: {
          wishlist_id,
        },
      }),
    }),
  }),
});

export const {
  useGetCategorizedStocksQuery,
  useGetAllStocksQuery,
  useGetStockDetailsQuery,
  useGetAllWishListQuery,
  useAddWishListMutation,
  useToggleLikeWishItemMutation,
} = marketApi;
