import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { RetrospectForm } from "../../../@types/retrospect";
import { projectApi } from "../project/project";
import {
  resetAllRetrospectQueries,
  resetProjectRetrospectQueries,
} from "./retrospect";
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

export const addRetrospectMutation = (builder: Builder) =>
  builder.mutation<
    {},
    {
      form: RetrospectForm;
    }
  >({
    query: ({ form }) => ({
      url: "/retrospect",
      method: "POST",
      body: form,
    }),
    invalidatesTags: ["retrospect", "monthlyRetrospect", "projectRetrospect"],
    onQueryStarted: async ({ form }, { dispatch, queryFulfilled }) => {
      let patchUpdateProjectCount;

      dispatch(resetAllRetrospectQueries());
      dispatch(resetProjectRetrospectQueries());

      patchUpdateProjectCount = dispatch(
        projectApi.util.updateQueryData(
          "getAllProjects",
          undefined,
          (draft) => {
            if (!draft) return;

            const index = draft.projects.findIndex(
              (project) => project.project_id === form.project_id
            );
            if (index === -1) return;

            draft.projects[index].retrospect_count++;
          }
        )
      );
      try {
        await queryFulfilled;
      } catch (e) {
        console.error(e);
        patchUpdateProjectCount.undo();
        showErrorToast("잠시후에 다시 시도해주세요");
      }
    },
  });

export const updateRetrospectMutation = (builder: Builder) =>
  builder.mutation<
    {},
    {
      retrospect_id: number;
      content: string;
    }
  >({
    query: (body) => ({
      url: `/retrospect`,
      method: "PUT",
      body: body,
    }),
    invalidatesTags: ["retrospect", "monthlyRetrospect", "projectRetrospect"],
    onQueryStarted: async ({ retrospect_id }, { dispatch, queryFulfilled }) => {
      dispatch(resetAllRetrospectQueries());
      dispatch(resetProjectRetrospectQueries());

      try {
        await queryFulfilled;
      } catch (e) {
        console.error(e);
        showErrorToast("잠시후에 다시 시도해주세요");
      }
    },
  });

export const deleteRetrospectMutation = (builder: Builder) =>
  builder.mutation<
    {},
    {
      retrospect_id: number;
      project_id: number;
    }
  >({
    query: (body) => ({
      url: `/retrospect`,
      method: "DELETE",
      body: body,
    }),
    invalidatesTags: ["retrospect", "monthlyRetrospect", "projectRetrospect"],
    onQueryStarted: async ({ project_id }, { dispatch, queryFulfilled }) => {
      dispatch(resetAllRetrospectQueries());
      dispatch(resetProjectRetrospectQueries());

      let patchUpdateProjectCount;
      patchUpdateProjectCount = dispatch(
        projectApi.util.updateQueryData(
          "getAllProjects",
          undefined,
          (draft) => {
            if (!draft) return;

            const index = draft.projects.findIndex(
              (project) => project.project_id === project_id
            );
            if (index === -1) return;

            draft.projects[index].retrospect_count--;
          }
        )
      );
      try {
        await queryFulfilled;
      } catch (e) {
        console.error(e);
        patchUpdateProjectCount.undo();
        showErrorToast("잠시후에 다시 시도해주세요");
      }
    },
  });
