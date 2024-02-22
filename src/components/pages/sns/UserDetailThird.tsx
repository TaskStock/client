import React from "react";
import { ScrollView, View } from "react-native";
import { WithLocalSvg } from "react-native-svg";
import { useTheme } from "styled-components";
import ProjectIcon from "../../../../assets/icons/Chart_white.svg";
import { Project } from "../../../@types/project";
import { spacing } from "../../../constants/spacing";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import ShadowForProject from "../../atoms/CustomShadow";
import FlexBox from "../../atoms/FlexBox";
import Text from "../../atoms/Text";
import {
  BoxIcon,
  ProjectBox,
  ProjectItem,
  Separator,
} from "../../organisms/Project/ProjectList";

export default function SnsDetailThird({
  projects,
}: {
  projects: {
    data: Project[] | undefined;
    isLoading: boolean;
    isError: boolean;
  };
}) {
  console.log(projects.data, "projects.data");

  const theme = useTheme();
  const filteredData = projects.data?.filter((project) => !project.finished);
  return (
    // <ContentLayout>
    <View
      style={{
        flex: 1,
      }}
    >
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
          contentContainerStyle={{
            paddingTop: spacing.offset,
            gap: useResponsiveFontSize(20),
          }}
        >
          {filteredData?.map((item, index) => (
            <ProjectItem item={item} />
          ))}
        </ScrollView>
      )}
    </View>
  );
}
