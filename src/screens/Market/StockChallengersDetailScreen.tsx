import React from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { useTheme } from "styled-components";
import styled from "styled-components/native";
import FlexBox from "../../components/atoms/FlexBox";
import Text from "../../components/atoms/Text";
import PageHeader from "../../components/molecules/PageHeader";
import { spacing } from "../../constants/spacing";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";
import ProfilePic from "../../components/atoms/ProfilePic";
import { useAppSelect } from "../../store/configureStore.hooks";

const CircleContainer = styled.View`
  width: ${useResponsiveFontSize(39)}px;
  height: ${useResponsiveFontSize(39)}px;
  border-radius: ${useResponsiveFontSize(39)}px;
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

const StockChallengersDetailScreen = ({ route, navigation }) => {
  const { userList, count, name } = route.params;
  const { user_id } = useAppSelect((state) => state.user.user);
  const theme = useTheme();

  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;

  const today = `${year}.${formattedMonth}.${formattedDay}`;
  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
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
              <TouchableOpacity
                key={user.user_id}
                onPress={() =>
                  user_id !== user.user_id &&
                  navigation.navigate("UserDetail", { userId: user.user_id })
                }
                disabled={user_id === user.user_id}
              >
                <CircleContainer>
                  <ProfilePic
                    image={user.image}
                    size={useResponsiveFontSize(35)}
                  />
                </CircleContainer>
              </TouchableOpacity>
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
