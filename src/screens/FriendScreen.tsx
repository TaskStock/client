import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import RankingAll from "../components/organisms/SNS/RankingAll";
import useHeight from "../hooks/useHeight";
import { client } from "../services/api";
import { useAppSelect } from "../store/configureStore.hooks";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const FriendScreen = () => {
  const { accessToken } = useAppSelect((state) => state.auth);
  const [rankingAll, setRankingAll] = useState([]);
  const { NOTCH_TOP } = useHeight();

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
      <RankingAll data={rankingAll} />
    </Container>
  );
};

export default FriendScreen;
