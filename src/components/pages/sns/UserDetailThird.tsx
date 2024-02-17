import { ScrollView, View } from "react-native";
import React from "react";
import ContentLayout from "../../atoms/ContentLayout";
import ProjectList, {
  BoxIcon,
  ProjectBox,
  ProjectItem,
} from "../../organisms/Project/ProjectList";
import { useProject } from "../../../hooks/useProject";
import { Project } from "../../../@types/project";
import { spacing } from "../../../constants/spacing";
import ProjectItemList from "../../organisms/TodoModal/ProjectItemList";
import FlexBox from "../../atoms/FlexBox";
import { WithLocalSvg } from "react-native-svg";
import Icons from "../../atoms/Icons";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import { useTheme } from "styled-components";
import ProjectIcon from "../../../../assets/icons/Chart_white.svg";
import Text from "../../atoms/Text";
import ShadowForProject from "../../atoms/CustomShadow";

export default function SnsDetailThird({
  projects,
}: {
  projects: {
    data: Project[] | undefined;
    isLoading: boolean;
    isError: boolean;
  };
}) {
  const theme = useTheme();
  const filteredData = projects.data?.filter((project) => !project.finished);
  return (
    // <ContentLayout>
    <View
      style={{
        flex: 1,
      }}
    >
      {/* <ProjectList
        projects={projects.data}
        isLoading={projects.isLoading}
        isError={projects.isError}
      ></ProjectList> */}
      {filteredData?.length === 0 ? (
        <FlexBox
          justifyContent="center"
          alignItems="center"
          styles={{ flex: 1 }}
        >
          <Text
            size="md"
            color={theme.textDim}
            styles={{ textAlign: "center" }}
          >
            진행중인 프로젝트가 없습니다.
          </Text>
        </FlexBox>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: spacing.padding }}
        >
          {filteredData?.map((item, index) => (
            <View
              key={item.project_id}
              style={{
                paddingHorizontal: spacing.gutter,
                marginBottom: 18,
              }}
            >
              <ShadowForProject radius={useResponsiveFontSize(15)}>
                <ProjectBox isFinished={item.finished}>
                  <FlexBox gap={spacing.padding} alignItems="center">
                    <BoxIcon>
                      <WithLocalSvg asset={ProjectIcon} />
                    </BoxIcon>
                    <View
                      style={{
                        flex: 1,
                        marginLeft: useResponsiveFontSize(5),
                      }}
                    >
                      <FlexBox
                        justifyContent="space-between"
                        styles={{
                          flex: 1,
                        }}
                        alignItems="center"
                      >
                        <FlexBox
                          direction="column"
                          gap={spacing.padding}
                          styles={{
                            flex: 1,
                          }}
                          justifyContent="center"
                        >
                          <Text size="lg" weight="bold">
                            {item.name}
                          </Text>

                          <FlexBox gap={spacing.padding}>
                            <Text size="xs" color={theme.textDim}>
                              {item.todo_count + ""}개의 할일
                            </Text>

                            <View
                              style={{
                                width: 1,
                                height: "100%",
                                backgroundColor: theme.textDim,
                              }}
                            />

                            <Text size="xs" color={theme.textDim}>
                              {item.retrospect_count + ""}
                              개의 회고
                            </Text>
                            <View
                              style={{
                                width: 1,
                                height: "100%",
                                backgroundColor: theme.textDim,
                              }}
                            />

                            <Text size="xs" color={theme.textDim}>
                              {item.public_range === "all"
                                ? "전체 공개"
                                : item.public_range === "follow"
                                ? "팔로워"
                                : "비공개"}
                            </Text>
                          </FlexBox>
                        </FlexBox>
                      </FlexBox>
                    </View>
                  </FlexBox>
                </ProjectBox>
              </ShadowForProject>
            </View>
          ))}
        </ScrollView>
      )}
    </View>

    // </ContentLayout>
  );
}
