import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import styled from "styled-components/native";
import Icons from "../../components/atoms/Icons";
import BadgeItemForAll from "../../components/organisms/Badge/BadgeItemForAll";
import { spacing } from "../../constants/spacing";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";
import Margin from "../../components/atoms/Margin";

const Container = styled.View`
  background-color: ${({ theme }) => theme.background};
  flex: 1;
`;
const SHeader = styled.View`
  padding: ${spacing.offset}px;
`;

const Header = ({ theme, onPress }) => (
  <SHeader>
    <Icons
      type="feather"
      name="chevron-left"
      size={35}
      color={theme.text}
      onPress={onPress}
    />
  </SHeader>
);
const Wrapper = styled.View`
  padding: ${spacing.offset}px;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${useResponsiveFontSize(15)}px;
`;

const BadgeAllScreen = ({ route, navigation }) => {
  const { type, badges: allBadges } = route.params;
  const theme = useTheme();

  return (
    <Container>
      <Header theme={theme} onPress={() => navigation.goBack()} />
      <ScrollView>
        <Wrapper>
          {allBadges.map((badge) => (
            <BadgeItemForAll key={badge.type} item={badge} type={type} />
          ))}
        </Wrapper>
        <Margin margin={100} />
      </ScrollView>
    </Container>
  );
};

export default BadgeAllScreen;
