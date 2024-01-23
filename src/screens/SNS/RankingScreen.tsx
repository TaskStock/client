import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { BlackBtn } from "../../components/atoms/Buttons";
import MyInfo from "../../components/organisms/SNS/MyInfo";
import RankingContainer from "../../components/organisms/SNS/RankingContainer";
import { spacing } from "../../constants/spacing";
import useHeight from "../../hooks/useHeight";
import { client } from "../../services/api";
import { useAppSelect } from "../../store/configureStore.hooks";

const Container = styled.View`
  flex: 1;
  padding-left: ${spacing.offset}px;
  padding-right: ${spacing.offset}px;
  background-color: ${({ theme }) => theme.background};
`;

const RankingScreen = ({ navigation }) => {
  const { accessToken } = useAppSelect((state) => state.auth);
  // 전체는 없애기
  const [rankingAll, setRankingAll] = useState([]);
  const [rankingFollower, setRankingFollower] = useState([]);
  const [rankingFollowing, setRankingFollowing] = useState([]);
  const { NOTCH_TOP } = useHeight();

  const myInfo = useAppSelect((state) => state.user.user);
  // console.log("내정보: ", myInfo);

  const getRanking = async () => {
    try {
      const res = await client.get("sns/users", { accessToken });
      // console.log(res);
      setRankingAll(res.rankingAll);
      setRankingFollower(res.rankingFollower);
      setRankingFollowing(res.rankingFollowing);
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
      <BlackBtn
        onPress={() => {
          navigation.navigate("EditProfile");
        }}
        text={"프로필 편집"}
        style={{ marginBottom: spacing.offset }}
      />
      <RankingContainer
        rankingAll={rankingAll}
        rankingFollowing={rankingFollowing}
        rankingFollower={rankingFollower}
      />
    </Container>
  );
};

export default RankingScreen;
