import { View, FlatList, TouchableOpacity, Linking } from "react-native";
import React from "react";
import PageHeader from "../../components/molecules/PageHeader";
import { ossLicenseData } from "../../../public/data/ossLicense";
import Text from "../../components/atoms/Text";
import { spacing } from "../../constants/spacing";
import Margin from "../../components/atoms/Margin";
import { useTheme } from "styled-components";
import FlexBox from "../../components/atoms/FlexBox";
import { palette } from "../../constants/colors";
import Menu from "../../components/molecules/Settings/Menu";

const OssLicenseScreen = ({ navigation }) => {
  const theme = useTheme();
  const RenderItem = ({ item }) => {
    return (
      <>
        <Menu
          text={
            item.libraryName.length > 35
              ? item.libraryName.substring(0, 35) + "..."
              : item.libraryName
          }
          onPress={() => {
            navigation.navigate("OssLicenseDetail", { item });
          }}
        />
      </>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <PageHeader title="오픈소스 라이선스" />
      <FlatList
        data={ossLicenseData}
        renderItem={({ item }) => <RenderItem item={item} />}
        keyExtractor={(item) => item.libraryName}
        contentContainerStyle={{
          paddingHorizontal: spacing.offset,
          paddingBottom: 100,
        }}
      />
    </View>
  );
};

export default OssLicenseScreen;
