import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ProjectStackParamList } from "../../../navigators/ProjectStack";
import { useAppDispatch } from "../../../store/configureStore.hooks";
import { useProject } from "../../../hooks/useProject";
import { useRetrospects } from "../../../hooks/useRetrospects";
import { resetRetrospectForm } from "../../../store/modules/retrospect/retrospect";
import RetrospectContainer from "../../organisms/Project/RetrospectContainer";

const ProjectScreenSecond = () => {
  const navigation = useNavigation<NavigationProp<ProjectStackParamList>>();

  const dispatch = useAppDispatch();

  const { projects } = useProject();

  const {
    filteredList: list,
    isLoading,
    isError,
    searchKeyword,
    selectedFilter,
    selectedProjectId,
    onPressProjectItem,
    onPressSelectedProjectFilter,
    onScrollListBottom,

    onChangeSearchKeyword,
    onPressFilter,
  } = useRetrospects();

  const onPressWriteProject = () => {
    dispatch(
      resetRetrospectForm({
        project_id: 0,
      })
    );
    navigation.navigate("ProjectStackWithoutTab", {
      screen: "RetrospectWrite",
    });
  };

  return (
    <>
      <RetrospectContainer
        projects={projects}
        onScrollListBottom={onScrollListBottom}
        searchKeyword={searchKeyword}
        onPressSelectedProjectFilter={onPressSelectedProjectFilter}
        onPressProjectItem={onPressProjectItem}
        onChangeSearchKeyword={onChangeSearchKeyword}
        onPressSearchIcon={() => {}}
        selectedProjectId={selectedProjectId}
        isAllRetrospects={true}
        filterIcon={require("../../../../assets/icons/orderIcon.svg")}
        ProjectFilterIcon={require("../../../../assets/icons/filterIcon.svg")}
        selectedFilter={selectedFilter}
        onPressFilter={onPressFilter}
        onPressWriteProject={onPressWriteProject}
        data={list}
        isLoading={isLoading}
        isError={isError}
      ></RetrospectContainer>
    </>
  );
};

export default ProjectScreenSecond;
