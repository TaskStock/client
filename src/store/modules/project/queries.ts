import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { Project } from "../../../@types/project";
import { showErrorToast } from "../../../utils/showToast";

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
    onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
      try {
        const response = await queryFulfilled;
      } catch (error) {
        console.log("Error", error);
        showErrorToast("프로젝트 목록을 불러오는데 실패했어요.");
      }
    },
  });
