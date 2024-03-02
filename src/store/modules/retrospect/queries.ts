import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { DateStringYYYYMM } from "../../../@types/calendar";
import { Retrospect } from "../../../@types/retrospect";
import { showErrorToast } from "../../../utils/showToast";

type Builder = EndpointBuilder<
  (
    args: any,
    api: any,
    extraOptions: any
  ) => Promise<
    | {
        data: any;
        error?: undefined;
      }
    | {
        error: {
          status: number;
          data: any;
        };
        data?: undefined;
      }
  >,
  "retrospect" | "projectRetrospect" | "monthlyRetrospect",
  "retrospectApi"
>;

export const getAllRetrospectQuery = (builder: Builder) =>
  builder.query<
    {
      retrospects: Retrospect[];
    },
    {
      offset: number;
      limit: number;
      filter?: "earliest" | "latest" | undefined;
      searchKeyword?: string | undefined;
    }
  >({
    query: ({ offset, limit, filter, searchKeyword }) => ({
      url: `/retrospect/all?offset=${offset}&limit=${limit}${
        filter ? `&filter=${filter}` : ""
      }${searchKeyword ? `&search=${searchKeyword}` : ""}`,
    }),
    providesTags: ["retrospect"],
    onQueryStarted: async ({ offset }, { dispatch, queryFulfilled }) => {
      try {
        const result = await queryFulfilled;
      } catch (error) {
        console.log(error);
        showErrorToast("기록 목록을 불러오는데 실패했어요.");
      }
    },
  });

export const getAllProjectRetrospectQuery = (builder: Builder) =>
  builder.query<
    {
      retrospects: Retrospect[];
    },
    {
      project_id: number;
      offset: number;
      filter?: "earliest" | "latest" | undefined;
      searchKeyword?: string | undefined;
      limit?: number;
    }
  >({
    query: ({ project_id, offset, filter, searchKeyword, limit }) => ({
      url: `/retrospect/project/${project_id}?offset=${offset}&limit=${limit}${
        filter ? `&filter=${filter}` : ""
      }${searchKeyword ? `&search=${searchKeyword}` : ""}`,
    }),
    providesTags: ["projectRetrospect"],
    onQueryStarted: async ({ offset }, { dispatch, queryFulfilled }) => {
      try {
        const result = await queryFulfilled;
      } catch (error) {
        console.log(error);
        showErrorToast("기록 목록을 불러오는데 실패했어요.");
      }
    },
  });

export const getMonthlyRetrospectQuery = (builder: Builder) =>
  builder.query<
    {
      retrospects: Retrospect[];
    },
    {
      date: DateStringYYYYMM;
    }
  >({
    query: ({ date }) => ({
      url: `/retrospect/month?date=${date}`,
    }),
    providesTags: ["monthlyRetrospect"],
  });
