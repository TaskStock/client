import { View, FlatList, ScrollView } from "react-native";
import React from "react";
import { Project } from "../../../@types/project";
import Icons from "../../atoms/Icons";
import { spacing } from "../../../constants/spacing";
import FlexBox from "../../atoms/FlexBox";
import RoundItemBtn from "../../atoms/RoundItemBtn";
import { WithLocalSvg } from "react-native-svg";
import ProjectIcon from "../../../../assets/icons/Chart_white.svg";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ProjectStackParamList } from "../../../navigators/ProjectStack";
import { ModalBtn, ModalContainer } from "../../atoms/FloatModal";
import OutsidePressHandler from "react-native-outside-press";
import {
  useAppDispatch,
  useAppSelect,
} from "../../../store/configureStore.hooks";
import {
  editProjectForm,
  useDeleteProjectMutation,
  useUpdateProjectMutation,
} from "../../../store/modules/project/project";
import { resetProjectRetrospectQueries } from "../../../store/modules/retrospect/retrospect";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import styled, { useTheme } from "styled-components/native";
import Margin from "../../atoms/Margin";
import Text from "../../atoms/Text";
import LoadingSpinner from "../../atoms/LoadingSpinner";
import user from "../../../store/modules/user";

const ProjectBox = styled.View<{ isFinished: boolean }>`
  border-radius: ${useResponsiveFontSize(20)}px;
  height: ${useResponsiveFontSize(179)}px;
  background-color: ${(props) =>
    props.isFinished ? props.theme.background : props.theme.box};
  padding: ${useResponsiveFontSize(20)}px;
`;

const BoxIcon = styled.View`
  width: ${useResponsiveFontSize(40)}px;
  height: ${useResponsiveFontSize(40)}px;
  border-radius: ${useResponsiveFontSize(20)}px;
  background-color: ${(props) => props.theme.projectIconBg};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MoreBtn = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  z-index: 1;
  gap: ${useResponsiveFontSize(3)}px;
  align-items: center;
`;

function ProjectItem({ item }: { item: Project }) {
  const navigation = useNavigation<NavigationProp<ProjectStackParamList>>();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [deleteProject] = useDeleteProjectMutation();
  const [updateProject] = useUpdateProjectMutation();

  const currentUserId = useAppSelect((state) => state.user.user.user_id);

  const theme = useTheme();

  const publicText =
    item.public_range === "all"
      ? "전체 공개"
      : item.public_range === "follow"
      ? "팔로워"
      : "비공개";

  const dispatch = useAppDispatch();

  const onPressProjectManageBtn = () => {
    dispatch(
      editProjectForm({
        project_id: item.project_id,
        name: item.name,
        public_range: item.public_range,
        finished: item.finished,
      })
    );
    navigation.navigate("ProjectManage");
  };

  const onPressProjectDetailBtn = () => {
    setIsModalOpen(false);
    dispatch(resetProjectRetrospectQueries());
    navigation.navigate("ProjectDetail", {
      project_id: item.project_id,
      project_title: item.name,
    });
  };

  const onPressProjectCompleteBtn = () => {
    setIsModalOpen(false);
    updateProject({
      project_id: item.project_id,
      name: item.name,
      public_range: item.public_range,
      finished: true,
    });
  };

  const onPressProjectDeleteBtn = () => {
    setIsModalOpen(false);
    deleteProject({
      project_id: item.project_id,
    });
  };

  const onPressMoreDot = () => {
    if (item.user_id !== currentUserId) {
      return;
    }

    setIsModalOpen(!isModalOpen);
  };

  return (
    <ProjectBox isFinished={item.finished}>
      <FlexBox
        gap={spacing.padding}
        styles={{
          flex: 1,
        }}
      >
        <BoxIcon>
          <WithLocalSvg asset={ProjectIcon} />
        </BoxIcon>

        <View style={{ flex: 1, marginLeft: useResponsiveFontSize(5) }}>
          <Margin margin={useResponsiveFontSize(5)}></Margin>
          <FlexBox
            justifyContent="space-between"
            styles={{
              flex: 1,
            }}
          >
            <FlexBox
              direction="column"
              gap={spacing.padding}
              styles={{
                flex: 1,
              }}
            >
              <Text size="xl" weight="bold">
                {item.name}
              </Text>
              <ScrollView
                horizontal={true}
                style={{
                  flexGrow: 0,
                  paddingBottom: useResponsiveFontSize(10),
                }}
              >
                <FlexBox gap={spacing.padding}>
                  <RoundItemBtn size="sm" isSelected={false}>
                    <Text size="sm">{item.todo_count + ""}개의 할일</Text>
                  </RoundItemBtn>
                  <RoundItemBtn size="sm" isSelected={false}>
                    <Text size="sm">
                      {item.retrospect_count + ""}
                      개의 회고
                    </Text>
                  </RoundItemBtn>
                  <RoundItemBtn size="sm" isSelected={false}>
                    <Text size="sm">{publicText}</Text>
                  </RoundItemBtn>
                </FlexBox>
              </ScrollView>
            </FlexBox>
            <View>
              <Icons
                type="feather"
                name="more-horizontal"
                size={useResponsiveFontSize(20)}
                onPress={onPressMoreDot}
              />
            </View>
          </FlexBox>
          {isModalOpen && (
            <OutsidePressHandler
              onOutsidePress={() => {
                setIsModalOpen(false);
              }}
              style={{
                position: "absolute",
                top: -10,
                right: 0,
                zIndex: 100,
              }}
            >
              <View style={{}}>
                <ModalContainer
                  position={{
                    top: 0,
                    right: 0,
                  }}
                >
                  <ModalBtn isSelected onPress={onPressProjectManageBtn}>
                    <Text size="sm" color={theme.textReverse}>
                      프로젝트 관리
                    </Text>
                  </ModalBtn>
                  {!item.finished && (
                    <ModalBtn onPress={onPressProjectCompleteBtn}>
                      <Text size="sm">완료로 이동</Text>
                    </ModalBtn>
                  )}

                  <ModalBtn onPress={onPressProjectDeleteBtn}>
                    <Text size="sm">삭제하기</Text>
                  </ModalBtn>
                </ModalContainer>
              </View>
            </OutsidePressHandler>
          )}
          {currentUserId == item.user_id && (
            <MoreBtn onPress={onPressProjectDetailBtn}>
              <Text size="sm">프로젝트 더보기</Text>
              <Icons type="entypo" name="chevron-thin-right" size={15} />
            </MoreBtn>
          )}
        </View>
      </FlexBox>
    </ProjectBox>
  );
}

export default function ProjectList({
  projects,
  isLoading,
  isError,
}: {
  projects: Project[] | undefined;
  isLoading: boolean;
  isError: boolean;
}) {
  if (!projects || isLoading || isError) {
    return (
      <>
        <LoadingSpinner></LoadingSpinner>
      </>
    );
  }

  if (projects.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: useResponsiveFontSize(20),
        }}
      >
        <Text size="lg">프로젝트가 없습니다.</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Project }) => {
    return <ProjectItem item={item} />;
  };

  const sortedProjects = [...projects].sort((a, b) => {
    return a.finished === b.finished ? 0 : a.finished ? 1 : -1;
  });
  return (
    <FlatList
      renderItem={renderItem}
      data={sortedProjects}
      keyExtractor={(item) => item.project_id.toString()}
      ItemSeparatorComponent={() => {
        return <Margin margin={useResponsiveFontSize(20)} />;
      }}
    ></FlatList>
  );
}
