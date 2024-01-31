import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import styled from "styled-components/native";
import AlarmBox from "../../components/molecules/Alarm/AlarmBox";
import PageHeader from "../../components/molecules/PageHeader";
import { client } from "../../services/api";
import { useAppSelect } from "../../store/configureStore.hooks";
import { useRefresh } from "@react-native-community/hooks";

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
  const { isRefreshing, onRefresh } = useRefresh(() => getData());
  const { accessToken } = useAppSelect((state) => state.auth);
  const [alarmDatas, setAlarmDatas] = useState([]);
  const getData = async () => {
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
  }, []);
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
        />
      )}
    </Container>
  );
};

export default AlarmScreen;
