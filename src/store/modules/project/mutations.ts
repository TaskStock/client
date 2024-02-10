import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { Project, publicType } from "../../../@types/project";
import { showErrorToast } from "../../../utils/showToast";

type MutationBuilder = EndpointBuilder<
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
  "Project",
  "projectApi"
>;

export const addProjectMutation = (builder: MutationBuilder) =>
  builder.mutation<
    {
      result: "success";
    },
    {
      name: string;
      public_range: publicType;
    }
  >({
    query: (body) => ({
      url: "/project",
      method: "POST",
      body: {
        name: body.name,
        public_range: body.public_range,
      },
    }),
    invalidatesTags: ["Project"],
    onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
      try {
        await queryFulfilled;
      } catch (error) {
        console.log("Error", error);
        showErrorToast("잠시후에 다시 시도해주세요.");
      }
    },
  });

export const deleteProjectMutation = (builder: MutationBuilder) =>
  builder.mutation<Project, { project_id: number }>({
    query: (body) => ({
      url: `/project`,
      method: "DELETE",
      body: {
        project_id: body.project_id,
      },
    }),
    invalidatesTags: ["Project"],
    onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
      try {
        await queryFulfilled;
      } catch (error) {
        console.log("Error", error);
        showErrorToast("잠시후에 다시 시도해주세요.");
      }
    },
  });

export const updateProjectMutation = (builder: MutationBuilder) =>
  builder.mutation<
    {
      result: "success";
    },
    {
      project_id: number;
      name: string;
      public_range: publicType;
      finished: boolean;
    }
  >({
    query: (body) => ({
      url: `/project`,
      method: "PUT",
      body: {
        project_id: body.project_id,
        name: body.name,
        public_range: body.public_range,
        finished: body.finished,
      },
    }),
    invalidatesTags: ["Project"],
    onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
      try {
        await queryFulfilled;
      } catch (error) {
        console.log("Error", error);
        showErrorToast("잠시후에 다시 시도해주세요.");
      }
    },
  });
