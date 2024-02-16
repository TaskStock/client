import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { useTheme } from "styled-components/native";
import CenterLayout from "../../components/atoms/CenterLayout";
import Icons from "../../components/atoms/Icons";
import LoadingSpinner from "../../components/atoms/LoadingSpinner";
import Margin from "../../components/atoms/Margin";
import Text from "../../components/atoms/Text";
import {
  DrawerContent,
  DrawerHeader,
} from "../../components/molecules/DrawerParts";
import TodoItem from "../../components/molecules/Home/TodoItem";
import PageHeader from "../../components/molecules/PageHeader";
import TabHeader from "../../components/molecules/TabHeader";
import HorizontalProjectList from "../../components/organisms/HorizontalProjectList";
import UserInfo from "../../components/organisms/SNS/UserInfo";
import UserDetailFirst from "../../components/pages/sns/UserDetailFirst";
import UserDetailSecond from "../../components/pages/sns/UserDetailSecond";
import UserDetailThird from "../../components/pages/sns/UserDetailThird";
import { spacing } from "../../constants/spacing";
import { useCurrentDate } from "../../hooks/useCurrentDate";
import { useTab } from "../../hooks/useTab";
import { SnsStackParamList } from "../../navigators/SnsStack";
import { useAppDispatch } from "../../store/configureStore.hooks";
import {
  getTargetUserThunk,
  useGetFriendInfoQuery,
} from "../../store/modules/getFriends";
import { checkIsSameLocalDay } from "../../utils/checkIsSameLocalDay";
import { Todo } from "../../@types/todo";

const routeMap = [
  { key: "first", title: "그래프" },
  { key: "second", title: "캘린더" },
  { key: "third", title: "프로젝트" },
];

type UserDetailScreenProps = NativeStackScreenProps<
  SnsStackParamList,
  "UserDetail"
>;

const UserDetailScreen = ({ route, navigation }: UserDetailScreenProps) => {
  const { userId } = route.params;

  const { data, isLoading, isError, error, refetch } = useGetFriendInfoQuery({
    userId,
  });

  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTargetUserThunk(userId));
  }, [userId]);

  const projects = data?.projects.filter((project) => {
    if (project.public_range == "all") return true;
    if (project.public_range == "follow") {
      if (data.targetData.isFollowingYou) return true;
      else return false;
    }

    return false;
  });

  // const isPrivate = data?.targetData?.private && ! (data.targetData.isFollowingYou && data.targetData.isFollowingMe);

  const isPrivate = data?.targetData?.private
    ? data.targetData.isFollowingYou && data.targetData.isFollowingMe
      ? false
      : true
    : false;

  const todos = data?.todos;

  const { currentDate, currentDateString } = useCurrentDate();

  const currentDaySelectedProjectTodos = todos
    ? todos
        .filter((todo) => checkIsSameLocalDay(todo.date, currentDateString))
        .filter((todo) => {
          if (selectedProjectId == null) return true;
          else return todo.project_id == selectedProjectId;
        })
    : [];

  const onPressProject = (id: number) => {
    setSelectedProjectId(id);
  };

  const values = data?.values;
  const userInfo = data?.targetData;

  const headerDate = useMemo(() => {
    return currentDate.format("MM월 DD일");
  }, [currentDate]);

  const renderContent = useCallback(
    (index: number) => {
      switch (index) {
        case 0:
          return (
            <UserDetailFirst
              userInfo={{
                cumulative_value: userInfo?.cumulative_value,
                value_yesterday_ago: userInfo?.value_yesterday_ago,
                nickname: userInfo?.user_name,
                error: error,
                loading: isLoading,
                refetch: () => {
                  dispatch(getTargetUserThunk(userId));
                },
              }}
              value={{
                data: values,
                isLoading: isLoading,
                isError: isError,
                error: error,
                refetch: refetch,
              }}
            ></UserDetailFirst>
          );
        case 1:
          return (
            <UserDetailSecond
              todos={{
                data: todos,
                isLoading: isLoading,
                isError: isError,
              }}
              user={{
                value_yesterday_ago: userInfo?.value_yesterday_ago,
                cumulative_value: userInfo?.cumulative_value,
              }}
            ></UserDetailSecond>
          );
        case 2:
          return (
            <UserDetailThird
              projects={{
                data: projects,
                isLoading: isLoading,
                isError: isError,
              }}
            ></UserDetailThird>
          );
      }
    },
    [
      data,
      isLoading,
      isError,
      error,
      refetch,
      dispatch,
      userId,
      userInfo,
      values,
      todos,
      projects,
    ]
  );

  const theme = useTheme();

  const { index, onChangeIndex, renderScene, routes } = useTab({
    routeMap,
    sceneMap: {
      first: () => <></>,
      second: () => <></>,
      third: () => <></>,
    },
  });

  const clientHeight = Dimensions.get("window").height;
  const minHeight = clientHeight * 0.48;

  const scrollViewRef = useRef<ScrollView>(null);

  if (isLoading || isError || !data) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <PageHeader
          headerRight={
            <Icons type="entypo" name="share" size={28} color="black" />
          }
        />
        <CenterLayout>
          <LoadingSpinner></LoadingSpinner>
        </CenterLayout>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <PageHeader
        headerRight={
          <Icons type="entypo" name="share" size={28} color="black" />
        }
      />
      {!isPrivate ? (
        <ScrollView ref={scrollViewRef} nestedScrollEnabled>
          <UserInfo />
          <Margin margin={spacing.offset} />
          <View
            style={{
              height: minHeight,
            }}
          >
            <TabHeader
              props={{
                navigationState: {
                  index: index,
                  routes: routes,
                },
              }}
              onPressTab={onChangeIndex}
            />
            <View style={{ flex: 1 }}>{renderContent(index)}</View>
          </View>
          <Margin margin={spacing.padding} />
          <View
            style={{
              backgroundColor: theme.background,
              minHeight: 700,
            }}
          >
            <DrawerHeader>
              <Text size="xl" weight="bold">
                {headerDate}
              </Text>
            </DrawerHeader>
            <HorizontalProjectList
              selectedProjectId={selectedProjectId}
              projects={projects}
              onPressProject={onPressProject}
            ></HorizontalProjectList>
            <DrawerContent>
              {currentDaySelectedProjectTodos.length > 0 ? (
                currentDaySelectedProjectTodos.map((todo) => (
                  <View
                    key={todo.todo_id}
                    style={{
                      pointerEvents: "none",
                    }}
                  >
                    <TodoItem todo={todo} />
                  </View>
                ))
              ) : (
                <Text
                  size="md"
                  color={theme.textDim}
                  styles={{ textAlign: "center", paddingTop: spacing.gutter }}
                >
                  등록된 투두가 없습니다.
                </Text>
              )}
            </DrawerContent>
          </View>
        </ScrollView>
      ) : (
        <CenterLayout>
          <Icons type="AntDesign" name="lock" size={70} color="black" />
          <Margin margin={spacing.offset} />
          <Text size="lg" weight="medium" color={theme.textDim}>
            비공개 계정입니다.
          </Text>
        </CenterLayout>
      )}
    </View>
  );
};

export default UserDetailScreen;

// <TabView
//   navigationState={{ index, routes }}
//   renderScene={renderScene}
//   onIndexChange={onChangeIndex}
//   renderTabBar={(props) => renderTabBar(props)}
//   onSwipeEnd={() => {}}
//   swipeEnabled={false}
//   style={{
//     minHeight: minHeight,
//   }}
// ></TabView>
