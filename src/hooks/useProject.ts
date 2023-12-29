import { useState } from "react";

const tempProjectList = [
  {
    id: 1,
    name: "프로젝트1",
    isSelected: true,
  },
  {
    id: 2,
    name: "토익",
    isSelected: false,
  },
  {
    id: 3,
    name: "프로그래밍",
    isSelected: false,
  },
  {
    id: 4,
    name: "태스크스탁",
    isSelected: false,
  },
];

export const useProject = () => {
  const [newProjectInput, setNewProjectInput] = useState("");
  const [isAddProject, setIsAddProject] = useState(false);

  const projectList = [...tempProjectList];

  // TODO: 프로젝트 불러오기
  // TODO: 프로젝트 추가하기

  const fetchAddProject = () => {
    console.log(newProjectInput);

    setIsAddProject(false);
    setNewProjectInput("");
  };

  const onChangeNewProjectName = (e) => {
    console.log(e.nativeEvent.text);

    setNewProjectInput(e.nativeEvent.text);
  };

  return {
    projectList,
    isAddProject,
    setIsAddProject,
    newProjectInput,
    setNewProjectInput,
    fetchAddProject,
    onChangeNewProjectName,
  };
};
