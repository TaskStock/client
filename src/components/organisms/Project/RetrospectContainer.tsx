import _ from "lodash";
import React from "react";
import { Pressable, ScrollView, View } from "react-native";
import { useTheme } from "styled-components/native";
import { Project } from "../../../@types/project";
import { Retrospect } from "../../../@types/retrospect";
import { spacing } from "../../../constants/spacing";
import ContentLayout from "../../atoms/ContentLayout";
import FlexBox from "../../atoms/FlexBox";
import Icons from "../../atoms/Icons";
import Margin from "../../atoms/Margin";
import RoundItemBtn from "../../atoms/RoundItemBtn";
import Text from "../../atoms/Text";
import CenterModal from "../../molecules/CenterModal";
import { SearchBar } from "../../molecules/SearchBar";
import { TextWithIcon } from "../../molecules/TextWithIcon";
import TextWithRadio from "../../molecules/TextWithRadioBtn";
import RetrospectList from "./RetrospectList";

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
    <>
      <ContentLayout noVerticalPadding>
        <FlexBox
          direction="column"
          alignItems="stretch"
          gap={spacing.padding + spacing.small}
          styles={{
            flex: 1,
            paddingTop: spacing.padding,
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
                size="sm"
              >
                <Icons
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
                  <TextWithIcon text="프로젝트" size="sm">
                    <Icons
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
                    size="sm"
                  >
                    <></>
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

          {((isAllRetrospects && projects.length != 0) ||
            !isAllRetrospects) && (
            <View
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                paddingHorizontal: spacing.small,
                paddingBottom: spacing.gutter,
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
      {isProjectFilterOpen && (
        <CenterModal
          onPressOutside={() => {
            setIsProjectFilterOpen(false);
          }}
        >
          <ScrollView
            style={{
              position: "absolute",
              bottom: 30,
              left: 0,
              right: 0,
              paddingHorizontal: spacing.small,
              paddingBottom: spacing.small,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ left: -5 }}>
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
            </View>
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
    </>
  );
}
