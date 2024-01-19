import { View } from "react-native";
import React from "react";
import ContentLayout from "../../atoms/ContentLayout";
import styled from "styled-components/native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Margin from "../../atoms/Margin";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import Icons from "../../atoms/Icons";
import Text from "../../atoms/Text";
import { spacing } from "../../../constants/spacing";
import FlexBox from "../../atoms/FlexBox";
import RoundItemBtn from "../../atoms/RoundItemBtn";
import { WithLocalSvg } from "react-native-svg";
import ProjectIcon from "../../../../assets/icons/Chart_white.svg";
import { useProject } from "../../../hooks/useProject";
import { Project } from "../../../@types/project";

const ProjectBox = styled.View`
  border-radius: ${useResponsiveFontSize(20)}px;
  height: ${useResponsiveFontSize(179)}px;
  background-color: ${(props) => props.theme.box};
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

const MoreBtn = styled.Pressable`
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  gap: ${useResponsiveFontSize(3)}px;
  align-items: center;
`;

export default function ProjectContainer() {
  const { projects } = useProject();

  const renderItem = ({ item }: { item: Project }) => {
    return (
      <ProjectBox>
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
                    <RoundItemBtn isSelected={false}>
                      <Text size="sm">24개의 할일</Text>
                    </RoundItemBtn>
                    <RoundItemBtn isSelected={false}>
                      <Text size="sm">24개의 회고</Text>
                    </RoundItemBtn>
                    <RoundItemBtn isSelected={false}>
                      <Text size="sm">전체공개</Text>
                    </RoundItemBtn>
                  </FlexBox>
                </ScrollView>
              </FlexBox>
              <View>
                <Icons
                  type="feather"
                  name="more-horizontal"
                  size={useResponsiveFontSize(20)}
                />
              </View>
            </FlexBox>
          </View>
          <MoreBtn>
            <Text size="sm">프로젝트 더보기</Text>
            <Icons type="entypo" name="chevron-thin-right" size={15} />
          </MoreBtn>
        </FlexBox>
      </ProjectBox>
    );
  };
  return (
    <ContentLayout>
      <FlatList
        renderItem={renderItem}
        data={projects}
        keyExtractor={(item) => item.project_id.toString()}
        ItemSeparatorComponent={() => {
          return <Margin margin={useResponsiveFontSize(20)} />;
        }}
      ></FlatList>
    </ContentLayout>
  );
}
