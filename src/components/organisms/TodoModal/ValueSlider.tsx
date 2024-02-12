import React from "react";
import Slider from "@react-native-community/slider";
import SliderThumb from "../../../../assets/images/slider-thumb.png";
import SliderThumbAndroid from "../../../../assets/images/slider-thumb_3.png";

import styled, { useTheme } from "styled-components/native";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import { useDispatch } from "react-redux";
import { setAddTodoForm } from "../../../store/modules/todo/todo";
import { useAppSelect } from "../../../store/configureStore.hooks";
import { Platform, View } from "react-native";

const SliderLabel = styled.View`
  position: absolute;
  width: 100%;
  bottom: -10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SliderLabelText = styled.Text`
  position: relative;
  top: -5px;
  font-size: ${useResponsiveFontSize(12)}px;
  color: ${({ theme }) => theme.textDim};
`;

const SliderGrid = styled.View`
  width: 1px;
  height: 10px;
  background-color: ${({ theme }) => theme.mainBtnGray};
  pointer-events: none;
  z-index: -1;
`;

export default function ValueSlider() {
  const dispatch = useDispatch();

  const sliderValue = useAppSelect((state) => state.todo.addTodoForm.level);

  const onChangeSliderValue = (value: number) => {
    const level = value > 0 ? Math.floor(value / 1000) : 0;

    dispatch(setAddTodoForm({ name: "level", value: level }));
  };

  const theme = useTheme();

  const sliderThumbImage =
    Platform.OS === "ios" ? SliderThumb : SliderThumbAndroid;

  const maximumTrackTintColor =
    Platform.OS === "ios" ? theme.mainBtnGray : theme.textDim;

  return (
    <View
      style={
        {
          // backgroundColor: "red",
        }
      }
    >
      <Slider
        minimumValue={0}
        maximumValue={5000}
        onValueChange={onChangeSliderValue}
        minimumTrackTintColor={theme.text}
        maximumTrackTintColor={maximumTrackTintColor}
        step={1000}
        tapToSeek={true}
        value={sliderValue * 1000}
        thumbImage={sliderThumbImage}
        style={
          {
            // backgroundColor: "red",
            // display: "flex",
            // flexDirection: "row",
            // alignItems: "center",
            // justifyContent: "space-between",
          }
        }
      ></Slider>
      <View
        style={{
          position: "absolute",
          top: Platform.OS === "ios" ? 40 : 30,
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* <SliderGrid />
        <SliderGrid />
        <SliderGrid />
        <SliderGrid />
        <SliderGrid />
        <SliderGrid /> */}
        <SliderLabel>
          <SliderLabelText>0</SliderLabelText>
          <SliderLabelText>5000</SliderLabelText>
        </SliderLabel>
      </View>
    </View>
  );
}
