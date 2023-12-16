import React, { useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import { View } from "react-native";
import styled from "styled-components/native";
import useHeight from "../../../utils/useHeight";
import { grayTheme } from "../../../constants/colors";
import FlexBox from "../../atoms/FlexBox";
import Icons, { IconsPic } from "../../atoms/Icons";

function HeaderTop() {
  const { NOTCH_TOP, HEADER_HEIGHT } = useHeight();

  return (
    <View
      style={{
        // height: HEADER_HEIGHT,
        backgroundColor: grayTheme.background,
        paddingTop: NOTCH_TOP,
      }}
    >
      <FlexBox
        justifyContent="space-between"
        alignItems="center"
        styles={{ paddingHorizontal: 30, paddingVertical: 20 }}
      >
        <Image
          source={require("../../../../assets/images/logo-light.png")}
          style={{
            height: 18,
            resizeMode: "contain",
            width: 134,
          }}
        />
        <FlexBox gap={20} alignItems="center">
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
