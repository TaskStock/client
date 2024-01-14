import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import RankingAll from "../components/organisms/SNS/RankingAll";
import useHeight from "../hooks/useHeight";
import { client } from "../services/api";
import { useAppSelect } from "../store/configureStore.hooks";
import MyInfo from "../components/organisms/SNS/MyInfo";
import { BlackBtn } from "../components/atoms/Buttons";
import { spacing } from "../constants/spacing";

const Container = styled.View`
  flex: 1;
  padding-left: ${spacing.offset}px;
  padding-right: ${spacing.offset}px;
`;

const FriendScreen = () => {
  const { accessToken } = useAppSelect((state) => state.auth);
  const [rankingAll, setRankingAll] = useState([]);
  const { NOTCH_TOP } = useHeight();

  const myInfo = useAppSelect((state) => state.user.user);
  console.log("내정보: ", myInfo);

  const getRanking = async () => {
    try {
      const res = await client.get("sns/users", { accessToken });
      console.log(res);
      setRankingAll(res.rankingResult);
    } catch (e) {
      console.log("error getting ranking", e);
    }
  };

  useEffect(() => {
    getRanking();
  }, []);

  return (
    <Container style={{ paddingTop: NOTCH_TOP }}>
      <MyInfo data={myInfo} />
      <BlackBtn onPress={() => {}} text={"프로필 편집"} />
      <RankingAll data={rankingAll} />
    </Container>
  );
};

export default FriendScreen;
