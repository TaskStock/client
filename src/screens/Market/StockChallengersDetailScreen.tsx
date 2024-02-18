import React from "react";
import { Image, ScrollView, View } from "react-native";
import { useTheme } from "styled-components";
import styled from "styled-components/native";
import FlexBox from "../../components/atoms/FlexBox";
import Text from "../../components/atoms/Text";
import PageHeader from "../../components/molecules/PageHeader";
import { spacing } from "../../constants/spacing";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";

const CircleContainer = styled.View`
  width: ${useResponsiveFontSize(30)}px;
  height: ${useResponsiveFontSize(30)}px;
  border-radius: ${useResponsiveFontSize(30)}px;
  background-color: ${({ theme }) => theme.text};
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.box};
`;
const Container = styled.View`
  padding: ${useResponsiveFontSize(60)}px ${spacing.gutter}px
    ${useResponsiveFontSize(200)}px;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;

const StockChallengersDetailScreen = ({ route }) => {
  const { userList, count, name } = route.params;
  const theme = useTheme();

  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;

  const today = `${year}.${formattedMonth}.${formattedDay}`;
  return (
    <View style={{ flex: 1 }}>
      <PageHeader />
      <Container>
        <Text size="lg">{count}명 실천중🔥</Text>

        <Text size="md" color={theme.textDim}>
          {name} {today}
        </Text>

        <ScrollView
          style={{
            marginVertical: useResponsiveFontSize(80),
            width: "100%",
          }}
        >
          <FlexBox
            alignItems="center"
            justifyContent="center"
            gap={5}
            styles={{ flexWrap: "wrap" }}
          >
            {userList.map((user) => (
              <CircleContainer key={user.user_id}>
                <Image
                  source={{ uri: user.image }}
                  style={{
                    width: useResponsiveFontSize(27),
                    height: useResponsiveFontSize(27),
                    resizeMode: "contain",
                  }}
                />
              </CircleContainer>
            ))}
          </FlexBox>
        </ScrollView>
        <Text size="sm" styles={{ textAlign: "center" }}>
          <Text size="sm" color={theme.high}>
            '{name}'
          </Text>
          을(를) 실천중인 {count}명에 동참해보세요!
        </Text>
      </Container>
    </View>
  );
};

export default StockChallengersDetailScreen;
