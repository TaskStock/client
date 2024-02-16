import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { FlatList, Modal, Pressable, View } from "react-native";
import OutsidePressHandler from "react-native-outside-press";
import { WithLocalSvg } from "react-native-svg";
import styled, { useTheme } from "styled-components/native";
import ProjectIcon from "../../../../assets/icons/Chart_white.svg";
import { Project } from "../../../@types/project";
import { spacing } from "../../../constants/spacing";
import { ProjectStackParamList } from "../../../navigators/ProjectStack";
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
import { getThemeElement } from "../../../utils/getThemeElement";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import ShadowForProject from "../../atoms/CustomShadow";
import FlexBox from "../../atoms/FlexBox";
import { ModalBtn, ModalContainer } from "../../atoms/FloatModal";
import Icons from "../../atoms/Icons";
import LoadingSpinner from "../../atoms/LoadingSpinner";
import Margin from "../../atoms/Margin";
import RoundItemBtn from "../../atoms/RoundItemBtn";
import Text from "../../atoms/Text";
import CenterModal from "../../molecules/CenterModal";

const ProjectBox = styled.Pressable<{ isFinished: boolean }>`
  border-radius: ${useResponsiveFontSize(20)}px;
  height: ${useResponsiveFontSize(179)}px;
  background-color: ${(props) =>
    props.isFinished ? props.theme.background : props.theme.box};
  padding: ${useResponsiveFontSize(20)}px;
  border-width: ${({ theme, isFinished }) => (isFinished ? 1 : 0)}px;
  border-color: ${({ theme }) => theme.projectItemBorder};
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

const MoreBtn = styled.View`
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  z-index: 1;
  gap: ${useResponsiveFontSize(3)}px;
  align-items: center;
`;

function ProjectItem({ item, zIndex }: { item: Project; zIndex?: number }) {
  const navigation = useNavigation<NavigationProp<ProjectStackParamList>>();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const zIndexOfModal = zIndex ? zIndex * 1000 : 1000;

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [deleteProject] = useDeleteProjectMutation();
  const [updateProject] = useUpdateProjectMutation();

  const currentUserId = useAppSelect((state) => state.user.user.user_id);

  const theme = useTheme();

  const modalPosition = {
    top: 20,
    right: 10,
  };

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
    if (item.user_id !== currentUserId) {
      return;
    }

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

  const onPressProjectDeleteModalBtn = () => {
    setIsModalOpen(false);
    deleteProject({
      project_id: item.project_id,
    });
  };

  const onPressProjectDeleteBtn = () => {
    setIsDeleteModalOpen(true);
  };

  const onPressMoreDot = () => {
    if (item.user_id !== currentUserId) {
      return;
    }

    setIsModalOpen(!isModalOpen);
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: spacing.gutter,
        zIndex: zIndexOfModal,
      }}
    >
      {!item.finished ? (
        <ShadowForProject radius={useResponsiveFontSize(20)}>
          <ProjectBox
            isFinished={item.finished}
            onPress={onPressProjectDetailBtn}
          >
            <FlexBox
              gap={spacing.padding}
              styles={{
                flex: 1,
              }}
            >
              <BoxIcon>
                <WithLocalSvg asset={ProjectIcon} />
              </BoxIcon>
              <View
                style={{
                  flex: 1,
                  marginLeft: useResponsiveFontSize(5),
                }}
              >
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

                    <FlexBox gap={spacing.padding}>
                      <RoundItemBtn size="sm" isSelected={false}>
                        <Text size="xs">{item.todo_count + ""}개의 할일</Text>
                      </RoundItemBtn>
                      <RoundItemBtn size="sm" isSelected={false}>
                        <Text size="xs">
                          {item.retrospect_count + ""}
                          개의 회고
                        </Text>
                      </RoundItemBtn>
                      <RoundItemBtn size="sm" isSelected={false}>
                        <Text size="xs">{publicText}</Text>
                      </RoundItemBtn>
                    </FlexBox>
                  </FlexBox>
                  <View>
                    <Icons
                      type="feather"
                      name="more-horizontal"
                      size={useResponsiveFontSize(20)}
                      onPress={onPressMoreDot}
                      color={theme.text}
                    />
                  </View>
                </FlexBox>

                {currentUserId == item.user_id && (
                  <MoreBtn>
                    <Text size="sm">프로젝트 더보기</Text>
                    <Icons
                      type="entypo"
                      name="chevron-thin-right"
                      size={15}
                      color={theme.text}
                    />
                  </MoreBtn>
                )}
              </View>
            </FlexBox>
          </ProjectBox>
          {isModalOpen && (
            <OutsidePressHandler
              onOutsidePress={() => {
                setIsModalOpen(false);
              }}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
              }}
            >
              <ModalContainer
                position={{
                  top: modalPosition.top,
                  right: modalPosition.right,
                }}
              >
                <ModalBtn isSelected onPress={onPressProjectManageBtn}>
                  <Text
                    size="sm"
                    color={getThemeElement(theme).reverseButtonText}
                  >
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
            </OutsidePressHandler>
          )}
        </ShadowForProject>
      ) : (
        <View>
          <ProjectBox
            isFinished={item.finished}
            onPress={onPressProjectDetailBtn}
          >
            <FlexBox
              gap={spacing.padding}
              styles={{
                flex: 1,
              }}
            >
              <BoxIcon>
                <WithLocalSvg asset={ProjectIcon} />
              </BoxIcon>
              <View
                style={{
                  flex: 1,
                  marginLeft: useResponsiveFontSize(5),
                }}
              >
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

                    <FlexBox gap={spacing.padding}>
                      <RoundItemBtn size="sm" isSelected={false}>
                        <Text size="xs">{item.todo_count + ""}개의 할일</Text>
                      </RoundItemBtn>
                      <RoundItemBtn size="sm" isSelected={false}>
                        <Text size="xs">
                          {item.retrospect_count + ""}
                          개의 회고
                        </Text>
                      </RoundItemBtn>
                      <RoundItemBtn size="sm" isSelected={false}>
                        <Text size="xs">{publicText}</Text>
                      </RoundItemBtn>
                    </FlexBox>
                  </FlexBox>
                  <View>
                    <Icons
                      type="feather"
                      name="more-horizontal"
                      size={useResponsiveFontSize(20)}
                      onPress={onPressMoreDot}
                      color={theme.text}
                    />
                  </View>
                </FlexBox>

                {currentUserId == item.user_id && (
                  <MoreBtn>
                    <Text size="sm">프로젝트 더보기</Text>
                    <Icons
                      type="entypo"
                      name="chevron-thin-right"
                      size={15}
                      color={theme.text}
                    />
                  </MoreBtn>
                )}
              </View>
            </FlexBox>
          </ProjectBox>
          {isModalOpen && (
            <OutsidePressHandler
              onOutsidePress={() => {
                setIsModalOpen(false);
              }}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
              }}
            >
              <ModalContainer
                position={{
                  top: modalPosition.top,
                  right: modalPosition.right,
                }}
              >
                <ModalBtn isSelected onPress={onPressProjectManageBtn}>
                  <Text
                    size="sm"
                    color={getThemeElement(theme).reverseButtonText}
                  >
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
            </OutsidePressHandler>
          )}
        </View>
      )}
      {isDeleteModalOpen && (
        <CenterModal
          onPressOutside={() => {
            setIsDeleteModalOpen(false);
          }}
        >
          <FlexBox direction="column" alignItems="center" gap={spacing.gutter}>
            <Text size="sm" weight="medium">
              해당 프로젝트를 삭제하시겠습니까?
            </Text>
            <View
              style={{
                width: "100%",
              }}
            >
              <Text size="sm" weight="regular">
                오늘 이후의 할 일이 함께 삭제됩니다.
              </Text>
            </View>
            <Margin margin={spacing.padding}></Margin>
            <FlexBox
              justifyContent="flex-end"
              styles={{
                width: "100%",
              }}
              gap={spacing.offset}
            >
              <Pressable
                onPress={() => {
                  setIsDeleteModalOpen(false);
                }}
              >
                <Text weight={"medium"} size="md" color={theme.text}>
                  취소
                </Text>
              </Pressable>
              <Pressable onPress={onPressProjectDeleteModalBtn}>
                <Text weight={"medium"} size="md" color={theme.palette.red}>
                  삭제
                </Text>
              </Pressable>
            </FlexBox>
          </FlexBox>
        </CenterModal>
      )}
    </View>
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

  const renderItem = ({ item, index }: { item: Project; index: number }) => {
    return <ProjectItem item={item} zIndex={index} />;
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
      ListFooterComponent={() => {
        return <Margin margin={useResponsiveFontSize(20)} />;
      }}
      style={
        {
          // flex: 1,
          // overflow: "visible",
        }
      }
    ></FlatList>
  );
}
