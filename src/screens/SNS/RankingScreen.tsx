import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import RankingAll from "../../components/organisms/SNS/RankingAll";
import useHeight from "../../hooks/useHeight";
import { client } from "../../services/api";
import { useAppSelect } from "../../store/configureStore.hooks";
import MyInfo from "../../components/organisms/SNS/MyInfo";
import { BlackBtn } from "../../components/atoms/Buttons";
import { spacing } from "../../constants/spacing";
import Icons from "../../components/atoms/Icons";

const Container = styled.View`
  flex: 1;
  padding-left: ${spacing.offset}px;
  padding-right: ${spacing.offset}px;
`;

const RankingScreen = ({ navigation }) => {
  const { accessToken } = useAppSelect((state) => state.auth);
  const [rankingAll, setRankingAll] = useState([]);
  const [rankingFollower, setRankingFollower] = useState([]);
  const [rankingFollowing, setRankingFollowing] = useState([]);
  const { NOTCH_TOP } = useHeight();

  const myInfo = useAppSelect((state) => state.user.user);
  console.log("내정보: ", myInfo);

  const getRanking = async () => {
    try {
      const res = await client.get("sns/users", { accessToken });
      console.log(res);
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
      />
      <Icons
        type="materialIcons"
        name="search"
        size={35}
        onPress={() => navigation.navigate("Search")}
      />
      <RankingAll data={rankingAll} />
    </Container>
  );
};

export default RankingScreen;
