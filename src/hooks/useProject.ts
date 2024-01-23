import React, { useState } from "react";
import { useAppSelect } from "../store/configureStore.hooks";
import {
  useAddProjectMutation,
  useGetAllProjectsQuery,
} from "../store/modules/project/project";

export const useProject = () => {
  const { data } = useGetAllProjectsQuery();

  const { selectedProjectId } = useAppSelect((state) => state.project);

  const projects = data?.projects || [];

  const [isAddProject, setIsAddProject] = React.useState(false);
  const [newProjectInput, setNewProjectInput] = React.useState("");

  const onChangeNewProjectName = (e) => {
    setNewProjectInput(e.nativeEvent.text);
  };

  const [addProject] = useAddProjectMutation();

  const fetchAddProject = () => {
    if (newProjectInput.length > 0) {
      setIsAddProject(false);

      addProject({ name: newProjectInput, ispublic: false });
    }
  };

  return {
    projects,
    selectedProjectId,
    isAddProject,
    setIsAddProject,
    newProjectInput,
    setNewProjectInput,
    onChangeNewProjectName,
    fetchAddProject,
  };
};
