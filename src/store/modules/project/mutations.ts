import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { Project, publicType } from "../../../@types/project";

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
    }
  >({
    query: (body) => ({
      url: `/project`,
      method: "PUT",
      body: {
        project_id: body.project_id,
        name: body.name,
        public_range: body.public_range,
      },
    }),
    invalidatesTags: ["Project"],
  });
