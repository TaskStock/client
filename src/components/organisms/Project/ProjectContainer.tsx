import { View } from "react-native";
import React from "react";
import ContentLayout from "../../atoms/ContentLayout";
import styled, { useTheme } from "styled-components/native";
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
import { NavigationProp, useNavigation } from "@react-navigation/native";
import PageMainHeader from "../../molecules/PageMainHeader";
import { ProjectStackParamList } from "../../../navigators/ProjectStack";
import { ModalBtn, ModalContainer } from "../../atoms/FloatModal";
import OutsidePressHandler from "react-native-outside-press";

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

  const onPressMoreDot = () => {
    setIsModalOpen(!isModalOpen);
  };

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const theme = useTheme();

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
                top: 0,
                right: 0,
                zIndex: 100,
              }}
            >
              <View
                style={
                  {
                    // position: "absolute",
                    // top: 0,
                    // right: 20,
                    // zIndex: 100,
                  }
                }
              >
                <ModalContainer
                  position={{
                    top: 0,
                    right: 0,
                  }}
                >
                  <ModalBtn isSelected onPress={() => {}}>
                    <Text size="sm" color={theme.textReverse}>
                      프로젝트 관리
                    </Text>
                  </ModalBtn>
                  <ModalBtn onPress={() => {}}>
                    <Text size="sm">완료로 이동</Text>
                  </ModalBtn>
                  <ModalBtn onPress={() => {}}>
                    <Text size="sm">삭제하기</Text>
                  </ModalBtn>
                </ModalContainer>
              </View>
            </OutsidePressHandler>
          )}

          <MoreBtn
            onPress={() => {
              navigation.navigate("ProjectDetail", {
                project_id: item.project_id,
                project_title: item.name,
              });
            }}
          >
            <Text size="sm">프로젝트 더보기</Text>
            <Icons type="entypo" name="chevron-thin-right" size={15} />
          </MoreBtn>
        </View>
      </FlexBox>
    </ProjectBox>
  );
}

export default function ProjectContainer() {
  const { projects } = useProject();

  const renderItem = ({ item }: { item: Project }) => {
    return <ProjectItem key={item.project_id} item={item} />;
  };

  return (
    <>
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
    </>
  );
}
