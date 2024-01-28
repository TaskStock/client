import { NavigationProp, useNavigation } from "@react-navigation/native";
import { memo } from "react";
import { ProjectStackParamList } from "../../../navigators/ProjectStack";
import { useAppDispatch } from "../../../store/configureStore.hooks";
import { useProjectRetrospects } from "../../../hooks/useRetrospects";
import { resetRetrospectForm } from "../../../store/modules/retrospect/retrospect";
import RetrospectContainer from "../../organisms/Project/RetrospectContainer";

const ProjectDetailSecond = memo(({ projectId }: { projectId: number }) => {
  console.log("detailsecond rerendered", projectId);

  const navigation = useNavigation<NavigationProp<ProjectStackParamList>>();

  const dispatch = useAppDispatch();

  const {
    selectedFilter,
    list,
    isLoading,
    isError,
    searchKeyword,
    onChangeSearchKeyword,
    onScrollListBottom,
    onPressFilter,
  } = useProjectRetrospects({ project_id: projectId });

  const onPressWriteProject = () => {
    dispatch(
      resetRetrospectForm({
        project_id: projectId,
      })
    );
    navigation.navigate("RetrospectWrite");
  };

  return (
    <RetrospectContainer
      selectedProjectId={null}
      selectedFilter={selectedFilter}
      projects={[]}
      isAllRetrospects={false}
      filterIcon={require("../../../../assets/icons/orderIcon.svg")}
      ProjectFilterIcon={require("../../../../assets/icons/filterIcon.svg")}
      data={list}
      isLoading={isLoading}
      isError={isError}
      onPressFilter={onPressFilter}
      onPressWriteProject={onPressWriteProject}
      onPressProjectItem={() => {}}
      searchKeyword={searchKeyword}
      onChangeSearchKeyword={onChangeSearchKeyword}
      onPressSearchIcon={() => {}}
      onScrollListBottom={onScrollListBottom}
    ></RetrospectContainer>
  );
});

export default ProjectDetailSecond;
