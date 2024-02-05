import { View, ScrollView, Dimensions } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import {
  NavigationState,
  SceneRendererProps,
  TabView,
} from "react-native-tab-view";
import TabHeader from "../../components/molecules/TabHeader";
import { useTab } from "../../hooks/useTab";
import PageHeader from "../../components/molecules/PageHeader";
import Icons from "../../components/atoms/Icons";
import UserDetailFirst from "../../components/pages/sns/UserDetailFirst";
import UserDetailSecond from "../../components/pages/sns/UserDetailSecond";
import UserDetailThird from "../../components/pages/sns/UserDetailThird";
import Margin from "../../components/atoms/Margin";
import {
  DrawerContent,
  DrawerHeader,
} from "../../components/molecules/DrawerParts";
import { spacing } from "../../constants/spacing";
import Text from "../../components/atoms/Text";
import HorizontalProjectList from "../../components/organisms/HorizontalProjectList";
import {
  getTargetUserThunk,
  useGetFriendInfoQuery,
} from "../../store/modules/getFriends";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SnsStackParamList } from "../../navigators/SnsStack";
import CenterLayout from "../../components/atoms/CenterLayout";
import LoadingSpinner from "../../components/atoms/LoadingSpinner";
import { useCurrentDate } from "../../hooks/useCurrentDate";
import TodoItem from "../../components/molecules/Home/TodoItem";
import { useTheme } from "styled-components/native";
import UserInfo from "../../components/organisms/SNS/UserInfo";
import { useAppDispatch } from "../../store/configureStore.hooks";
import { checkIsSameLocalDay } from "../../utils/checkIsSameLocalDay";

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

  const [selectedProjectId, setSelectedProjectId] = useState(null);

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

  const isPrivate = data?.targetData.private;

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

  const values = data?.values;
  const userInfo = data?.targetData;

  const headerDate = useMemo(() => {
    return currentDate.format("MM월 DD일");
  }, [currentDate]);

  const sceneMap = useMemo(() => {
    return {
      first: () => (
        <UserDetailFirst
          userInfo={{
            cumulative_value: userInfo?.cumulative_value,
            value_yesterday_ago: userInfo?.value_yesterday_ago,
            nickname: userInfo?.user_name,
            error: error,
            loading: isLoading,
          }}
          value={{
            data: values,
            isLoading: isLoading,
            isError: isError,
            error: error,
            refetch: refetch,
          }}
        ></UserDetailFirst>
      ),
      second: () => (
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
      ),
      third: () => (
        <UserDetailThird
          projects={{
            data: projects,
            isLoading: isLoading,
            isError: isError,
          }}
        ></UserDetailThird>
      ),
    };
  }, [data]);

  const renderTabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<{
        key: string;
        title: string;
      }>;
    }
  ) => {
    return (
      <TabHeader
        props={props}
        onPressTab={(index) => {
          onChangeIndex(index);
        }}
      />
    );
  };

  const theme = useTheme();

  const { index, onChangeIndex, renderScene, routes } = useTab({
    routeMap,
    sceneMap,
  });

  const clientHeight = Dimensions.get("window").height;
  const minHeight = index <= 2 ? clientHeight * 0.48 : clientHeight * 0.7;

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
        <ScrollView>
          <UserInfo />
          <Margin margin={spacing.offset} />
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={onChangeIndex}
            renderTabBar={(props) => renderTabBar(props)}
            onSwipeEnd={() => {}}
            swipeEnabled={false}
            style={{
              minHeight: minHeight,
            }}
          ></TabView>
          {index <= 2 && (
            <>
              <Margin margin={spacing.padding} />
              <View
                style={{
                  backgroundColor: theme.background,
                  height: 1000,
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
                  onPressProject={(id) => {}}
                ></HorizontalProjectList>
                <DrawerContent>
                  {currentDaySelectedProjectTodos.length > 0 ? (
                    currentDaySelectedProjectTodos.map((todo) => (
                      <View
                        style={{
                          pointerEvents: "none",
                        }}
                      >
                        <TodoItem key={todo.todo_id} todo={todo} />
                      </View>
                    ))
                  ) : (
                    <Text size="md">등록된 투두가 없습니다.</Text>
                  )}
                </DrawerContent>
              </View>
            </>
          )}
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
