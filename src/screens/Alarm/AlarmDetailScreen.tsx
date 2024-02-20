import React from "react";
import { ScrollView, View, Image } from "react-native";
import { useTheme } from "styled-components";
import styled from "styled-components/native";
import FlexBox from "../../components/atoms/FlexBox";
import Margin from "../../components/atoms/Margin";
import Text from "../../components/atoms/Text";
import WordBreakKeepAllText from "../../components/atoms/WordBreakKeepAllText";
import PageHeader from "../../components/molecules/PageHeader";
import { spacing } from "../../constants/spacing";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";

const Container = styled.View`
  padding: ${spacing.padding}px 0 ${spacing.offset}px;
  margin: 0 ${spacing.offset}px;
  gap: ${spacing.padding}px;
  border: 1px solid transparent;
  border-bottom-color: ${({ theme }) => theme.textDim};
  word-break: keep-all;
`;

const ImageContainer = styled.View`
  width: 100%;
  height: 300px;
  background-color: ${({ theme }) => theme.box};
`;
const PinnedDetail = () => (
  <FlexBox direction="column" alignItems="center">
    <View
      style={{ padding: spacing.offset, width: "80%", alignItems: "center" }}
    >
      <WordBreakKeepAllText text="TaskStock 하루 최종 가치 반영" />
      <Margin margin={spacing.offset} />
      <WordBreakKeepAllText
        text="매일의 가치는 그 날 자정(00:00)에 최종 마감되며, 마감 이후에는 해당 날의
      할 일 추가 및 삭제가 불가능합니다."
      />
      <Margin margin={spacing.offset} />
      <WordBreakKeepAllText text="*완료 처리는 가능하지만 가치에 반영되지는 않습니다." />
      <Margin margin={spacing.offset} />
      <WordBreakKeepAllText text="❗️ 놓치는 가치가 없도록 꼭 자정 전에 완료 처리를 해주세요 ❗️" />
      <Margin margin={spacing.offset} />
    </View>
    <ImageContainer>
      <Image
        source={require("../../../assets/images/textLogo-white.png")}
        style={{ width: "100%", height: "100%", resizeMode: "contain" }}
      />
    </ImageContainer>
    <Margin margin={useResponsiveFontSize(200)} />
  </FlexBox>
);

const Header = ({ title, subText, theme }) => (
  <Container>
    <Text size="lg">{title}</Text>
    <Text size="md" color={theme.textDim}>
      {subText}
    </Text>
  </Container>
);

const AlarmDetailScreen = ({ route }) => {
  const { detail, title, subText } = route.params;
  const theme = useTheme();

  return (
    <>
      <PageHeader title="" />
      <ScrollView>
        <Header title={title} subText={subText} theme={theme} />

        <FlexBox justifyContent="center">
          {detail ? (
            <View
              style={{
                padding: spacing.offset,
                width: "80%",
                alignItems: "center",
              }}
            >
              <WordBreakKeepAllText text={detail} />
            </View>
          ) : (
            <PinnedDetail />
          )}
        </FlexBox>
      </ScrollView>
    </>
  );
};

export default AlarmDetailScreen;
