import { useRefresh } from "@react-native-community/hooks";
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import { useTheme } from "styled-components";
import styled from "styled-components/native";
import AlarmBox from "../../components/molecules/Alarm/AlarmBox";
import PinnedAlarmBox from "../../components/molecules/Alarm/PinnedAlarmBox";
import PageHeader from "../../components/molecules/PageHeader";
// import { client } from "../../services/api";
import { useAppDispatch, useAppSelect } from "../../store/configureStore.hooks";
import { useClient } from "../../hooks/useClient";
import { client } from "../../services/api";
import { checkAndRenewTokens } from "../../utils/authUtils/tokenUtils";

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
  type: "sns" | "general" | "admin";
}

const AlarmScreen = () => {
  const dispatch = useAppDispatch();
  const { isRefreshing, onRefresh } = useRefresh(() => getData());
  const { accessToken } = useAppSelect((state) => state.auth);
  const { followerList, followingList, searchList } = useAppSelect(
    (state) => state.friends
  );
  const [alarmDatas, setAlarmDatas] = useState([]);
  const theme = useTheme();
  const getData = async () => {
    // await dispatch(checkAndRenewTokens());
    try {
      const res = await client.get("notice/all", {
        accessToken,
      });
      setAlarmDatas(res.noticeList);
      console.log("알림 목록: ", res.noticeList);
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
      {alarmDatas.length !== 0 && (
        <FlatList<IAlarmData>
          data={alarmDatas}
          renderItem={({ item }) => <AlarmBox item={item} />}
          keyExtractor={(item, index) => item.notice_id.toString()}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
          ListHeaderComponent={<PinnedAlarmBox />}
        />
      )}
    </Container>
  );
};

export default AlarmScreen;
