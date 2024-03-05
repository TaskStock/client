import { useRefresh } from "@react-native-community/hooks";
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import styled from "styled-components/native";
import AlarmBox from "../../components/molecules/Alarm/AlarmBox";
import PinnedAlarmBox from "../../components/molecules/Alarm/PinnedAlarmBox";
import PageHeader from "../../components/molecules/PageHeader";
import { useClient } from "../../hooks/useClient";
import { useAppDispatch, useAppSelect } from "../../store/configureStore.hooks";
import LoadingSpinner from "../../components/atoms/LoadingSpinner";

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

export interface IAlarmData {
  content: string;
  created_time: string;
  info: any;
  is_read: boolean;
  notice_id: number;
  type: "sns" | "general" | "admin" | "badge";
}

const AlarmScreen = () => {
  const dispatch = useAppDispatch();
  const { isRefreshing, onRefresh } = useRefresh(() => getData());
  const { accessToken } = useAppSelect((state) => state.auth);

  const { followerList, followingList, searchList } = useAppSelect(
    (state) => state.friends
  );
  const [alarmDatas, setAlarmDatas] = useState([]);

  const client = useClient(dispatch);
  const getData = async () => {
    try {
      const res = await client.get("notice/all", {
        accessToken,
      });
      setAlarmDatas(res.noticeList);
      // console.log("알림 목록: ", res.noticeList);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getData();
  }, [followerList, followingList, searchList]);
  return (
    <Container>
      <PageHeader title="알림" />
      <FlatList<IAlarmData>
        data={alarmDatas}
        renderItem={({ item }) => <AlarmBox item={item} />}
        keyExtractor={(item) => item.notice_id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor="transparent"
            colors={["transparent"]}
            style={{ backgroundColor: "transparent" }}
          />
        }
        ListHeaderComponent={
          <>
            <View
              style={{
                position: "absolute",
                width: "100%",
                height: 60,
                alignItems: "center",
                justifyContent: "center",
                top: -60,
              }}
            >
              <LoadingSpinner />
            </View>

            <PinnedAlarmBox />
          </>
        }
      />
    </Container>
  );
};

export default AlarmScreen;
