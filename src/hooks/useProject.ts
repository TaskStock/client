import { useState } from "react";
import { useAppSelect } from "../store/configureStore.hooks";
import { useGetAllProjectsQuery } from "../store/modules/project";

export const useProject = () => {
  const { data } = useGetAllProjectsQuery();

  const { selectedProjectId } = useAppSelect((state) => state.project);

  const projects = data?.projects || [];

  return {
    projects,
    selectedProjectId,
  };
};
