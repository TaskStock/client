import { View, Text } from "react-native";
import React from "react";
import useUser from "../../../hooks/useUser";
import useValue from "../../../hooks/useValue";
import GraphWithUserInfo from "../../organisms/GraphWithUserInfo";

function HomeScreenFirst() {
  const {
    user,
    loading: userInfoLoading,
    error: userInfoError,
    refetch: refetchUser,
  } = useUser();
  const { data: values, error, isError, isLoading, refetch } = useValue();

  return (
    <GraphWithUserInfo
      isMyData={true}
      userInfo={{
        cumulative_value: user?.cumulative_value,
        value_yesterday_ago: user?.value_yesterday_ago,
        nickname: user?.user_name,
        error: userInfoError,
        loading: userInfoLoading,
        refetch: refetchUser,
      }}
      value={{
        data: values,
        // data: [],
        // data: undefined,
        isLoading,
        isError,
        error,
        refetch,
      }}
    />
  );
}

export default React.memo(HomeScreenFirst);
