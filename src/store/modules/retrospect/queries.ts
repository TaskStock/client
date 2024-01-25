import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { Retrospect } from "../../../@types/retrospect";
import { DateStringYYYYMM } from "../../../@types/calendar";

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
      url: `/retrospect/project/${project_id}?offset=${offset}&limit=${limit}
        ${filter ? `&filter=${filter}` : ""}${
        searchKeyword ? `&search=${searchKeyword}` : ""
      }
      `,
    }),
    providesTags: ["projectRetrospect"],
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
