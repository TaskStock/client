import { View, Pressable } from "react-native";
import React from "react";
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
import _ from "lodash";
import CenterModal from "../../molecules/CenterModal";
import TextWithRadio from "../../molecules/TextWithRadioBtn";
import { ScrollView } from "react-native-gesture-handler";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import Margin from "../../atoms/Margin";
import { IconsWithoutFeedBack } from "../../atoms/Icons";

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
  const [selectedTempId, setSelectedTempId] = React.useState<number | null>(
    null
  );
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
              <IconsWithoutFeedBack
                type="ionicons"
                name="filter"
                color={theme.text}
                size={spacing.offset}
              />
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
                  <IconsWithoutFeedBack
                    type="AntDesign"
                    name="filter"
                    color={theme.text}
                    size={spacing.offset}
                  />
                </TextWithIcon>
              </Pressable>
            ) : (
              <Pressable
                onPress={() => {
                  setIsProjectFilterOpen(true);
                }}
              >
                <TextWithIcon
                  text={selectedProjectName || ""}
                  textColor={theme.palette.red}
                >
                  <></>
                </TextWithIcon>
              </Pressable>
            ))}
          {isProjectFilterOpen && (
            <CenterModal
              onPressOutside={() => {
                setIsProjectFilterOpen(false);
              }}
            >
              <ScrollView
                style={{
                  height: useResponsiveFontSize(200),
                }}
              >
                <TextWithRadio
                  value={"전체"}
                  id={null}
                  selectedId={selectedTempId}
                  onPressRadio={() => {
                    setSelectedTempId(null);
                  }}
                ></TextWithRadio>
                {projects.map((project) => (
                  <TextWithRadio
                    key={project.project_id + "project"}
                    id={project.project_id}
                    selectedId={selectedTempId}
                    value={project.name}
                    onPressRadio={() => {
                      setSelectedTempId(project.project_id);
                    }}
                  ></TextWithRadio>
                ))}
              </ScrollView>
              <Margin margin={spacing.offset}></Margin>
              <FlexBox
                justifyContent="flex-end"
                styles={{
                  paddingHorizontal: spacing.offset,
                }}
              >
                <Pressable
                  onPress={() => {
                    setIsProjectFilterOpen(false);

                    if (!selectedTempId) {
                      onPressSelectedProjectFilter?.();
                    } else {
                      onPressProjectItem(selectedTempId);
                    }
                  }}
                >
                  <Text weight={"medium"} size="md" color={theme.text}>
                    확인
                  </Text>
                </Pressable>
              </FlexBox>
            </CenterModal>
          )}
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
              <Text
                size="md"
                color={theme.name == "gray" ? theme.textReverse : theme.text}
              >
                회고 작성하기
              </Text>
            </RoundItemBtn>
          </View>
        )}
      </FlexBox>
    </ContentLayout>
  );
}
