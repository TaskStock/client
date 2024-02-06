import React, { useEffect } from "react";
import styled from "styled-components/native";
import { BlackBtn } from "../../components/atoms/Buttons";
import MyInfo from "../../components/organisms/SNS/MyInfo";
import RankingContainer from "../../components/organisms/SNS/RankingContainer";
import { spacing } from "../../constants/spacing";
import useHeight from "../../hooks/useHeight";
import { useAppDispatch, useAppSelect } from "../../store/configureStore.hooks";
import { getFriendsThunk } from "../../store/modules/getFriends";

const Container = styled.View`
  flex: 1;
  padding-left: ${spacing.offset}px;
  padding-right: ${spacing.offset}px;
  background-color: ${({ theme }) => theme.background};
`;

const RankingScreen = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { NOTCH_TOP } = useHeight();

  useEffect(() => {
    dispatch(getFriendsThunk());
  }, []);

  return (
    <Container style={{ paddingTop: NOTCH_TOP }}>
      <MyInfo />
      <BlackBtn
        onPress={() => {
          navigation.navigate("EditProfile");
        }}
        text={"프로필 편집"}
        style={{ marginBottom: spacing.offset }}
      />
      <RankingContainer />
    </Container>
  );
};

export default RankingScreen;
