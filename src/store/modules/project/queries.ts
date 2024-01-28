import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { Project } from "../../../@types/project";

export const getAllProjectsQuery = (
  builder: EndpointBuilder<
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
  >
) =>
  builder.query<
    {
      projects: Project[];
    },
    void
  >({
    query: () => ({
      url: "/project/all",
      method: "GET",
    }),
    providesTags: ["Project"],
  });
