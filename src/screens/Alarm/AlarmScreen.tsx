import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import AlarmBox from "../../components/molecules/Alarm/AlarmBox";
import PageHeader from "../../components/molecules/PageHeader";
import { client } from "../../services/api";
import { useAppSelect } from "../../store/configureStore.hooks";

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.box};
`;

export interface IAlarmData {
  content: string;
  created_time: string;
  info: any;
  is_read: boolean;
  notice_id: number;
  type: "sns" | "general" | "admin";
}

const dummyDatas = [
  {
    content: "sewon님이 팔로우 요청을 보냈습니다.",
    created_time: "2024-01-30T17:44:33.356Z",
    info: {
      follower_id: 149,
      isFollowingMe: false,
      isFollowingYou: false,
      pending: true,
    },
    is_read: true,
    notice_id: 21,
    type: "sns",
  },
  {
    content: "가입 인사",
    created_time: "2024-01-25T20:25:43.236Z",
    info: { detail: "태스팀입니당", title: "안녕하세요" },
    is_read: true,
    notice_id: 1,
    type: "admin",
  },
];

const AlarmScreen = ({ navigation }) => {
  const { accessToken } = useAppSelect((state) => state.auth);
  const [alarmDatas, setAlarmDatas] = useState([]);
  const getData = async () => {
    try {
      const res = await client.get("notice/all", {
        accessToken,
      });
      setAlarmDatas(res.noticeList);
      console.log(res.noticeList);
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
      <FlatList<IAlarmData>
        data={alarmDatas}
        renderItem={({ item }) => <AlarmBox item={item} />}
        keyExtractor={(item, index) => item.notice_id.toString()}
      />
    </Container>
  );
};

export default AlarmScreen;
