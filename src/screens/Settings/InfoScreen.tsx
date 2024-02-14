import React from "react";
import DeviceInfo from "react-native-device-info";
import styled from "styled-components/native";
import FlexBox from "../../components/atoms/FlexBox";
import Text from "../../components/atoms/Text";
import PageHeader from "../../components/molecules/PageHeader";
import Menu from "../../components/molecules/Settings/Menu";
import { spacing } from "../../constants/spacing";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";
import { Linking } from "react-native";

const Container = styled.View`
  flex: 1;
  padding: 0 ${spacing.offset}px;
`;

const Version = ({ version }) => (
  <FlexBox
    justifyContent="space-between"
    alignItems="center"
    styles={{ height: useResponsiveFontSize(60) }}
  >
    <Text size="md">버전 정보</Text>
    <Text size="md">{version}</Text>
  </FlexBox>
);
const InfoScreen = ({ navigation }) => {
  const appVersion = DeviceInfo.getVersion();

  return (
    <>
      <PageHeader title="정보" />
      <Container>
        <Version version={appVersion} />
        <Menu
          text="개인정보 처리방침"
          onPress={() => {
            Linking.openURL(
              "https://stingy-law-ab2.notion.site/01acf34630f64e948bad39d86e71b9f3?pvs=4"
            );
          }}
          icon={{ type: "material", name: "shield-account-variant" }}
        />
        <Menu
          text="이용 약관"
          onPress={() => {
            Linking.openURL(
              "https://stingy-law-ab2.notion.site/TASKSTOCK-82abb4f1382e489d90921414ad1f6595?pvs=4"
            );
          }}
          icon={{ type: "material", name: "file-document" }}
        />
        <Menu
          text="오픈소스 라이선스"
          onPress={() => navigation.navigate("OssLicense")}
          icon={{ type: "entypo", name: "open-book" }}
        />
      </Container>
    </>
  );
};

export default InfoScreen;
