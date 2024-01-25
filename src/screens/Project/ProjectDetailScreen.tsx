import { View, Dimensions } from "react-native";
import React, { useContext, useEffect } from "react";
import PageHeader from "../../components/molecules/PageHeader";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProjectStackParamList } from "../../navigators/ProjectStack";
import { useTab } from "../../hooks/useTab";
import { TabView } from "react-native-tab-view";
import TabHeader from "../../components/molecules/TabHeader";
import ContentLayout from "../../components/atoms/ContentLayout";
import Calendar from "../../components/molecules/Calendar";
import BottomDrawer from "../../components/molecules/Home/BottomDrawer";
import { ComponentHeightContext } from "../../utils/ComponentHeightContext";
import ItemContainerBox from "../../components/molecules/ItemContainerBox";
import { DateInfo } from "../../components/organisms/Home/HomeCalendar";
import { useCurrentDate } from "../../hooks/useCurrentDate";
import useTodos from "../../hooks/useTodos";
import Text from "../../components/atoms/Text";
import { DateContainer } from "../../components/molecules/Home/TodoContainer";
import styled from "styled-components/native";
import { spacing } from "../../constants/spacing";
import Margin from "../../components/atoms/Margin";
import FlexBox from "../../components/atoms/FlexBox";
import TodoItem from "../../components/molecules/Home/TodoItem";
import { useResizeLayoutOnFocus } from "../../hooks/useResizeLayoutOnFocus";
import { checkIsSameLocalDay } from "../../utils/checkIsSameLocalDay";
import RetrospectContainer from "../../components/organisms/Project/RetrospectContainer";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../../store/configureStore.hooks";
import {
  resetRetrospectForm,
  useGetAllProjectRetrospectQuery,
  useGetMonthlyRetrospectQuery,
} from "../../store/modules/retrospect/retrospect";
import { DateStringYYYYMM } from "../../@types/calendar";
import { useProjectRetrospects } from "../../hooks/useRetrospects";

type Props = NativeStackScreenProps<ProjectStackParamList, "ProjectDetail">;

const routeMap = [
  {
    key: "first",
    title: "캘린더",
  },
  {
    key: "second",
    title: "회고",
  },
];

const ProjectBox = styled.View`
  padding: ${spacing.padding}px;
  border-radius: ${spacing.padding}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.textDimmer};
`;

function ProjectSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <ProjectBox>
      <Text size="md">{title}</Text>
      <Margin margin={10}></Margin>
      {children}
    </ProjectBox>
  );
}

function ProjectDetailSecond({ projectId }: { projectId: number }) {
  const navigation = useNavigation<NavigationProp<ProjectStackParamList>>();

  const dispatch = useAppDispatch();

  const {
    selectedFilter,
    list,
    isLoading,
    isError,
    searchKeyword,
    onChangeSearchKeyword,
    onScrollListBottom,
    onPressFilter,
  } = useProjectRetrospects({ project_id: projectId });

  const onPressWriteProject = () => {
    dispatch(
      resetRetrospectForm({
        project_id: projectId,
      })
    );
    navigation.navigate("RetrospectWrite");
  };

  return (
    <RetrospectContainer
      selectedFilter={selectedFilter}
      projects={[]}
      isAllRetrospects={false}
      filterIcon={require("../../../assets/icons/orderIcon.svg")}
      ProjectFilterIcon={require("../../../assets/icons/filterIcon.svg")}
      data={list}
      isLoading={isLoading}
      isError={isError}
      onPressFilter={onPressFilter}
      onPressWriteProject={onPressWriteProject}
      onPressProjectItem={() => {}}
      searchKeyword={searchKeyword}
      onChangeSearchKeyword={onChangeSearchKeyword}
      onPressSearchIcon={() => {}}
      onScrollListBottom={onScrollListBottom}
    ></RetrospectContainer>
  );
}

function ProjectDetailFirst({ projectId }: { projectId: number }) {
  const { currentDate, currentDateString, subtract1Month, add1Month } =
    useCurrentDate();
  const onPressLeft = subtract1Month;
  const onPressRight = add1Month;

  const {
    DEFAULT_HEIGHT,
    OPEN_STATE,
    headerHeight,
    tabHeight,
    setContentsHeight,
  } = useContext(ComponentHeightContext);

  const { data: todos, currentDayTodos } = useTodos();

  const currentProjectTodos = todos.filter(
    (todo) => todo.project_id === projectId
  );

  const currentDayProjectTodos = currentDayTodos.filter((todo) =>
    checkIsSameLocalDay(todo.date, currentDateString)
  );

  const clientHeight = Dimensions.get("window").height;
  const headerDate = currentDate.format("MM월 DD일");

  const onLayout = useResizeLayoutOnFocus({
    resizeFunction(height) {
      const resizedHeight = height - headerHeight - tabHeight + spacing.padding;
      setContentsHeight(resizedHeight);
    },
  });

  const { data, isLoading, isError } = useGetMonthlyRetrospectQuery({
    date: currentDate.format("YYYY-MM") as DateStringYYYYMM,
  });

  const currentProjectRetrospects = data?.retrospects
    .filter((retrospect) => retrospect.project_id === projectId)
    .filter((retrospect) =>
      checkIsSameLocalDay(retrospect.created_date, currentDateString)
    );

  return (
    <>
      <View
        onLayout={onLayout}
        style={{
          height: clientHeight * 0.48,
        }}
      >
        <ContentLayout>
          <DateInfo
            currentDate={currentDate}
            onPressLeft={onPressLeft}
            onPressRight={onPressRight}
            isShowingInfo={false}
          ></DateInfo>
          <ItemContainerBox>
            <Calendar todos={currentProjectTodos}></Calendar>
          </ItemContainerBox>
        </ContentLayout>
      </View>
      <BottomDrawer
        openState={OPEN_STATE}
        closedState={DEFAULT_HEIGHT}
        onDrawerStateChange={(state) => {}}
      >
        <DateContainer>
          <FlexBox
            direction="column"
            justifyContent="space-between"
            alignItems="stretch"
            gap={10}
          >
            <Text size="xl" weight="bold">
              {headerDate}
            </Text>
            <ProjectSection title="할 일">
              {currentDayProjectTodos.map((todo) => (
                <TodoItem key={todo.todo_id} todo={todo}></TodoItem>
              ))}
            </ProjectSection>
            <ProjectSection title="회고">
              {
                isLoading ? (
                  <Text size="md">loading...</Text>
                ) : isError ? (
                  <Text size="md">회고를 불러오는중 에러가 발생했습니다.</Text>
                ) : (
                  <Text size="md">
                    {currentProjectRetrospects && currentProjectRetrospects[0]
                      ? currentProjectRetrospects[0].content.length > 10
                        ? currentProjectRetrospects[0].content.slice(0, 10) +
                          "..."
                        : currentProjectRetrospects[0].content
                      : "회고가 없습니다."}
                  </Text>
                )
                //   currentProjectRetrospects &&
                //   currentProjectRetrospects[0] &&
                //   currentProjectRetrospects[0].content.length > 10 && (
                //   <Text size="md">{currentProjectRetrospects[0].content.slice(0, 10)}...</Text>
                //   ) : (
                //     <Text size="md">{currentProjectRetrospects[0].content}</Text>
                //   )

                // )}
              }
            </ProjectSection>
          </FlexBox>
        </DateContainer>
      </BottomDrawer>
    </>
  );
}

export default function ProjectDetailScreen({ navigation, route }: Props) {
  const sceneMap = {
    first: () => <ProjectDetailFirst projectId={route.params.project_id} />,
    second: () => <ProjectDetailSecond projectId={route.params.project_id} />,
  };

  const { index, onChangeIndex, renderScene, routes } = useTab({
    routeMap,
    sceneMap,
  });

  const renderTabBar = (props: any) => {
    return (
      <TabHeader
        onPressTab={(index: number) => {
          onChangeIndex(index);
        }}
        props={props}
      />
    );
  };

  return (
    <>
      <PageHeader title={route.params.project_title || "프로젝트 상세"} />
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
}
