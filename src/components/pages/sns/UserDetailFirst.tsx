import { View, Dimensions } from "react-native";
import React from "react";
import GraphWithUserInfo from "../../organisms/GraphWithUserInfo";
import { Value } from "../../../@types/chart";

export default function UserDetailFirst({
  userInfo,
  value,
}: {
  userInfo: {
    cumulative_value?: number;
    value_yesterday_ago?: number;
    nickname?: string;
    error: any;
    loading: boolean;
  };
  value: {
    data: Value[] | undefined;
    isLoading: boolean;
    isError: boolean;
    error: any;
    refetch: () => void;
  };
}) {
  return (
    <View style={{ flex: 1 }}>
      <GraphWithUserInfo
        userInfo={{
          cumulative_value: userInfo?.cumulative_value,
          value_yesterday_ago: userInfo?.value_yesterday_ago,
          nickname: userInfo?.nickname,
          error: userInfo?.error,
          loading: userInfo?.loading,
        }}
        value={{
          data: value?.data,
          isLoading: value.isLoading,
          isError: value.isError,
          error: value.error,
          refetch: value.refetch,
        }}
      ></GraphWithUserInfo>
    </View>
  );
}
