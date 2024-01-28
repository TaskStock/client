import { View, Pressable, Modal } from "react-native";
import React from "react";
import CenterLayout from "../../atoms/CenterLayout";
import FlexBox from "../../atoms/FlexBox";
import { spacing } from "../../../constants/spacing";
import { SearchBar } from "../../molecules/SearchBar";
import { TextWithIcon } from "../../molecules/TextWithIcon";
import { WithLocalSvg } from "react-native-svg";
import RetrospectList from "./RetrospectList";
import RoundItemBtn from "../../atoms/RoundItemBtn";
import { useTheme } from "styled-components/native";
import ContentLayout from "../../atoms/ContentLayout";
import Text from "../../atoms/Text";
import { Retrospect } from "../../../@types/retrospect";
import { Project } from "../../../@types/project";
import OutsidePressHandler from "react-native-outside-press";
import _ from "lodash";

export default function RetrospectContainer({
  selectedFilter,
  onPressFilter,
  onPressWriteProject,
  projects,
  isAllRetrospects,
  filterIcon,
  ProjectFilterIcon,
  onChangeSearchKeyword,
  onPressProjectItem,
  onPressSearchIcon,
  onPressSelectedProjectFilter,
  data,
  isLoading,
  selectedProjectId,
  onScrollListBottom,
  isError,
}: {
  selectedFilter: "latest" | "earliest";
  searchKeyword: string;
  filterIcon: any;
  selectedProjectId: number | null;
  isAllRetrospects: boolean;
  ProjectFilterIcon: any;
  data: Retrospect[] | undefined;
  isLoading: boolean;
  isError: boolean;
  projects: Project[];
  onPressFilter: () => void;
  onPressWriteProject: () => void;
  onChangeSearchKeyword: (text: string) => void;
  onPressProjectItem: (id: number) => void | undefined;
  onPressSearchIcon: () => void;
  onPressSelectedProjectFilter?: () => void;
  onScrollListBottom: () => void;
}) {
  const theme = useTheme();

  const [isProjectFilterOpen, setIsProjectFilterOpen] = React.useState(false);
  const selectedProjectName = _.find(projects, {
    project_id: selectedProjectId,
  })?.name;

  return (
    <ContentLayout>
      <FlexBox
        direction="column"
        alignItems="stretch"
        gap={spacing.offset}
        styles={{
          flex: 1,
        }}
      >
        <SearchBar
          onChangeText={onChangeSearchKeyword}
          onPressSearchIcon={onPressSearchIcon}
        ></SearchBar>
        <FlexBox
          justifyContent="space-between"
          styles={{
            paddingHorizontal: spacing.small,
          }}
        >
          <Pressable onPress={onPressFilter}>
            <TextWithIcon
              text={selectedFilter === "latest" ? "최신순" : "오래된순"}
            >
              <WithLocalSvg
                width={13}
                height={13}
                asset={filterIcon}
              ></WithLocalSvg>
            </TextWithIcon>
          </Pressable>
          {isAllRetrospects &&
            (!selectedProjectId ? (
              <Pressable
                onPress={() => {
                  setIsProjectFilterOpen((prev) => !prev);
                }}
              >
                <TextWithIcon text="프로젝트">
                  <WithLocalSvg
                    width={13}
                    height={13}
                    asset={ProjectFilterIcon}
                  ></WithLocalSvg>
                </TextWithIcon>
                {isProjectFilterOpen && (
                  <Modal transparent>
                    <OutsidePressHandler
                      onOutsidePress={() => {
                        setIsProjectFilterOpen(false);
                      }}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,

                        backgroundColor: "rgba(0,0,0,0.5)",
                      }}
                    >
                      <CenterLayout>
                        <Text size="md">프로젝트</Text>
                        <View>
                          {projects.map((project) => (
                            <Pressable
                              key={project.project_id + "project"}
                              onPress={() => {
                                onPressProjectItem(project.project_id);
                                setIsProjectFilterOpen(false);
                              }}
                            >
                              <Text size="md">{project.name}</Text>
                            </Pressable>
                          ))}
                        </View>
                      </CenterLayout>
                    </OutsidePressHandler>
                  </Modal>
                )}
              </Pressable>
            ) : (
              <Pressable onPress={onPressSelectedProjectFilter}>
                <TextWithIcon
                  text={selectedProjectName || ""}
                  textColor={theme.palette.red}
                >
                  <WithLocalSvg
                    width={13}
                    height={13}
                    asset={ProjectFilterIcon}
                  ></WithLocalSvg>
                </TextWithIcon>
              </Pressable>
            ))}
        </FlexBox>
        <RetrospectList
          onScrollBottom={onScrollListBottom}
          list={data}
          isLoading={isLoading}
          isError={isError}
        ></RetrospectList>

        {((isAllRetrospects && projects.length != 0) || !isAllRetrospects) && (
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              paddingHorizontal: spacing.small,
              paddingBottom: spacing.small,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <RoundItemBtn onPress={onPressWriteProject} size="xl" isSelected>
              <Text size="md" color={theme.textReverse}>
                회고 작성하기
              </Text>
            </RoundItemBtn>
          </View>
        )}
      </FlexBox>
    </ContentLayout>
  );
}
