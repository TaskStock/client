import { View, Pressable } from "react-native";
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
import { useProject } from "../../../hooks/useProject";
import { Project } from "../../../@types/project";
import OutsidePressHandler from "react-native-outside-press";
import { ModalContainer } from "../../atoms/FloatModal";

export default function RetrospectContainer({
  selectedFilter,
  onPressFilter,
  onPressWriteProject,
  projects,
  isAllRetrospects,
  filterIcon,
  ProjectFilterIcon,
  onChangeSearchKeyword,
  onPressSearchIcon,
  data,
  isLoading,
  onScrollListBottom,
  isError,
}: {
  selectedFilter: "latest" | "earliest";
  onPressFilter: () => void;
  onPressWriteProject: () => void;
  searchKeyword: string;
  onChangeSearchKeyword: (text: string) => void;
  onPressProjectItem: (id: number) => void | undefined;
  onPressSearchIcon: () => void;
  filterIcon: any;
  isAllRetrospects: boolean;
  ProjectFilterIcon: any;
  data: Retrospect[] | undefined;
  onScrollListBottom: () => void;
  isLoading: boolean;
  isError: boolean;
  projects: Project[];
}) {
  const theme = useTheme();

  const [isProjectFilterOpen, setIsProjectFilterOpen] = React.useState(false);

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
          {isAllRetrospects && (
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

              {/* {isProjectFilterOpen && (
                <OutsidePressHandler
                  onOutsidePress={() => {
                    setIsProjectFilterOpen(false);
                  }}
                >
                  <ModalContainer position={{ top: 0, left: 0, right: 0 }}>
                    {projects.map((project) => (
                      <View>
                        <Text size="md">{project.name}</Text>
                      </View>
                    ))}
                  </ModalContainer>
                </OutsidePressHandler>
              )} */}
            </Pressable>
          )}
        </FlexBox>
        <RetrospectList
          onScrollBottom={onScrollListBottom}
          list={data}
          isLoading={isLoading}
          isError={isError}
        ></RetrospectList>
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
      </FlexBox>
    </ContentLayout>
  );
}
