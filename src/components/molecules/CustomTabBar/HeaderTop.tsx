import React, { useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import { View } from "react-native";
import styled from "styled-components/native";
import useHeight from "../../../utils/useHeight";
import { grayTheme } from "../../../constants/colors";
import FlexBox from "../../atoms/FlexBox";
import { IconsPic } from "../../atoms/Icons";
import { spacing } from "../../../constants/spacing";

function HeaderTop({ navigation }) {
  const { NOTCH_TOP, HEADER_HEIGHT } = useHeight();

  return (
    <View
      style={{
        backgroundColor: grayTheme.background,
        paddingTop: NOTCH_TOP,
      }}
    >
      <FlexBox
        justifyContent="space-between"
        alignItems="center"
        styles={{
          paddingHorizontal: spacing.gutter,
          paddingVertical: spacing.offset,
        }}
      >
        <Image
          source={require("../../../../assets/images/logo-light.png")}
          style={{
            width: 134,
            height: 18,
            resizeMode: "contain",
          }}
        />
        <FlexBox gap={spacing.offset} alignItems="center">
          <TouchableOpacity>
            <IconsPic
              source={require("../../../../assets/icons/bell-light.png")}
              size={30}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <IconsPic
              source={require("../../../../assets/icons/person-light.png")}
              size={30}
            />
          </TouchableOpacity>
        </FlexBox>
      </FlexBox>
    </View>
  );
}

export default HeaderTop;
