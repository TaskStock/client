import React, { useEffect } from "react";
import styled from "styled-components/native";
import { BlackBtn } from "../../components/atoms/Buttons";
import MyInfo from "../../components/organisms/SNS/MyInfo";
import RankingContainer from "../../components/organisms/SNS/RankingContainer";
import { spacing } from "../../constants/spacing";
import useHeight from "../../hooks/useHeight";
import { useAppDispatch, useAppSelect } from "../../store/configureStore.hooks";
import { getFriendsThunk } from "../../store/modules/getFriends";
import createBadgeDispatcher from "../../utils/badgeUtils/badge";
import { showSuccessToast } from "../../utils/showToast";

const Container = styled.View`
  flex: 1;
  padding-left: ${spacing.offset}px;
  padding-right: ${spacing.offset}px;
  background-color: ${({ theme }) => theme.background};
`;

const RankingScreen = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { NOTCH_TOP } = useHeight();
  const { follower_count } = useAppSelect((state) => state.user.user);

  useEffect(() => {
    dispatch(getFriendsThunk());
  }, []);

  const badgeDispatcher = createBadgeDispatcher(dispatch);

  useEffect(() => {
    // 팔로워 10명 돌파
    if (follower_count >= 10) {
      badgeDispatcher.reached10Followers();
      showSuccessToast("새로운 뱃지를 획득했어요!🔥");
    }
    // 팔로워 42명 돌파
    if (follower_count >= 42) {
      badgeDispatcher.reached42Followers();
      showSuccessToast("새로운 뱃지를 획득했어요!🔥");
    }
  }, [follower_count]);

  return (
    <Container style={{ paddingTop: NOTCH_TOP }}>
      <MyInfo />
      <BlackBtn
        onPress={() => {
          navigation.navigate("SnsStack", { screen: "EditProfile" });
        }}
        text={"프로필 편집"}
        style={{ marginBottom: spacing.offset }}
      />
      <RankingContainer />
    </Container>
  );
};

export default RankingScreen;
