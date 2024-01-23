import React from "react";
import {
  NavigationState,
  SceneRendererProps,
  TabView,
} from "react-native-tab-view";
import TabHeader from "../../components/molecules/TabHeader";
import ProjectContainer from "../../components/organisms/Project/ProjectContainer";
import PageMainHeader from "../../components/molecules/PageMainHeader";
import { useTab } from "../../hooks/useTab";
import ContentLayout from "../../components/atoms/ContentLayout";
import { SearchBar } from "../../components/molecules/SearchBar";
import FlexBox from "../../components/atoms/FlexBox";
import { spacing } from "../../constants/spacing";
import { TextWithIcon } from "../../components/molecules/TextWithIcon";
import { ScrollView, View } from "react-native";
import RetrospectList from "../../components/organisms/Project/RetrospectList";
import { WithLocalSvg } from "react-native-svg";
import Icons from "../../components/atoms/Icons";
import { useTheme } from "styled-components/native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ProjectStackParamList } from "../../navigators/ProjectStack";
import RoundItemBtn from "../../components/atoms/RoundItemBtn";
import Text from "../../components/atoms/Text";

const ProjectScreenFirst = () => <ProjectContainer></ProjectContainer>;

const ProjectScreenSecond = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<ProjectStackParamList>>();

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
        <SearchBar></SearchBar>
        <FlexBox
          justifyContent="space-between"
          styles={{
            paddingHorizontal: spacing.small,
          }}
        >
          <TextWithIcon text="최신순">
            <WithLocalSvg
              width={13}
              height={13}
              asset={require("../../../assets/icons/orderIcon.svg")}
            ></WithLocalSvg>
          </TextWithIcon>
          <TextWithIcon text="필터">
            <WithLocalSvg
              width={13}
              height={13}
              asset={require("../../../assets/icons/filterIcon.svg")}
            ></WithLocalSvg>
          </TextWithIcon>
        </FlexBox>
        <RetrospectList></RetrospectList>
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
          <RoundItemBtn
            onPress={() => {
              console.log("회고 작성하기");

              navigation.navigate("RetrospectWrite");
            }}
            size="xl"
            isSelected
          >
            <Text size="md" color={theme.textReverse}>
              회고 작성하기
            </Text>
          </RoundItemBtn>
        </View>
      </FlexBox>
    </ContentLayout>
  );
};

const sceneMap = {
  first: ProjectScreenFirst,
  second: ProjectScreenSecond,
};

const routeMap = [
  { key: "first", title: "프로젝트" },
  { key: "second", title: "회고" },
];

const ProjectScreen = () => {
  const { index, onChangeIndex, renderScene, routes } = useTab({
    routeMap,
    sceneMap,
  });

  const renderTabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<{
        key: string;
        title: string;
      }>;
    }
  ) => {
    return <TabHeader onPressTab={onChangeIndex} props={props} />;
  };

  const theme = useTheme();

  const navigation = useNavigation<NavigationProp<ProjectStackParamList>>();

  return (
    <>
      <PageMainHeader title="프로젝트">
        <Icons
          type="entypo"
          name="circle-with-plus"
          size={28}
          color={theme.text}
          onPress={() => {
            navigation.navigate("ProjectManage");
          }}
        />
      </PageMainHeader>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={onChangeIndex}
        renderTabBar={(props) => renderTabBar(props)}
        onSwipeEnd={() => {}}
        swipeEnabled={false}
      ></TabView>
    </>
  );
};

export default ProjectScreen;
