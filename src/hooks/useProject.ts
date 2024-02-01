import React, { useState } from "react";
import { useAppSelect } from "../store/configureStore.hooks";
import {
  useAddProjectMutation,
  useGetAllProjectsQuery,
} from "../store/modules/project/project";

export const useProject = () => {
  const { data, isLoading, isError } = useGetAllProjectsQuery();

  const { selectedProjectId } = useAppSelect((state) => state.project);

  const projects = data?.projects || [];

  const findProjectNameById = (project_id: number) => {
    const project = projects.find(
      (project) => project.project_id === project_id
    );
    return project?.name;
  };

  const [isAddProject, setIsAddProject] = React.useState(false);
  const [newProjectInput, setNewProjectInput] = React.useState("");

  const onChangeNewProjectName = (e) => {
    setNewProjectInput(e.nativeEvent.text);
  };

  const [addProject] = useAddProjectMutation();

  const fetchAddProject = () => {
    if (newProjectInput.length > 0) {
      setIsAddProject(false);

      addProject({ name: newProjectInput, public_range: "all" });
    }
  };

  return {
    isLoading,
    isError,
    projects,
    selectedProjectId,
    isAddProject,
    setIsAddProject,
    findProjectNameById,
    newProjectInput,
    setNewProjectInput,
    onChangeNewProjectName,
    fetchAddProject,
  };
};
