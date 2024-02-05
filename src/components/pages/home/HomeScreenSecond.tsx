import React from "react";
import HomeCalendar from "../../organisms/Home/HomeCalendar";
import useUser from "../../../hooks/useUser";
import useTodos from "../../../hooks/useTodos";

function HomeScreenSecond() {
  const { user, loading: userInfoLoading, error: userInfoError } = useUser();

  const {
    data: todos,
    isLoading: todosIsLoading,
    isError: todosIsError,
  } = useTodos();

  return (
    <HomeCalendar
      user={{
        value_yesterday_ago: user?.value_yesterday_ago,
        cumulative_value: user?.cumulative_value,
      }}
      todos={{
        data: todos,
        isLoading: todosIsLoading,
        isError: todosIsError,
      }}
    />
  );
}

export default React.memo(HomeScreenSecond);
