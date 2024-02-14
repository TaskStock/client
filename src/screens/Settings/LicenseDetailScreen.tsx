import { Linking, View } from "react-native";
import React from "react";
import { spacing } from "../../constants/spacing";
import Text from "../../components/atoms/Text";
import { TouchableOpacity } from "react-native";
import { useTheme } from "styled-components";
import { ScrollView } from "react-native";
import PageHeader from "../../components/molecules/PageHeader";

const LicenseDetailScreen = ({ route }) => {
  const theme = useTheme();
  const { item } = route.params;
  return (
    <>
      <PageHeader />
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View
          style={{
            paddingLeft: spacing.gutter,
            paddingVertical: spacing.padding,
          }}
        >
          <Text
            size="sm"
            weight="bold"
            styles={{ paddingBottom: spacing.padding }}
          >
            {item.libraryName}
          </Text>
          <Text
            size="sm"
            color={theme.textDim}
            styles={{ paddingBottom: spacing.padding }}
          >
            {item.version} | {item._license}
          </Text>
          <Text
            size="sm"
            color={theme.textDim}
            styles={{ paddingBottom: spacing.padding }}
          >
            {item._licenseContent}
          </Text>
          <Text
            size="sm"
            color={theme.textDim}
            styles={{ paddingBottom: spacing.padding }}
          >
            {item._description}
          </Text>
          <TouchableOpacity onPress={() => Linking.openURL(item.homepage)}>
            <Text
              size="sm"
              color={"#2980b9"}
              styles={{ textDecorationLine: "underline" }}
            >
              {item.homepage}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default LicenseDetailScreen;
