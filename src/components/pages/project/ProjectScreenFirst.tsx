import React from "react";
import ContentLayout from "../../atoms/ContentLayout";
import ProjectList from "../../organisms/Project/ProjectList";
import { useProject } from "../../../hooks/useProject";

export default function ProjectScreenFirst() {
  const { projects, isError, isLoading } = useProject();
  return (
    <>
      <ContentLayout>
        <ProjectList
          projects={projects}
          isLoading={isLoading}
          isError={isError}
        ></ProjectList>
      </ContentLayout>
    </>
  );
}
