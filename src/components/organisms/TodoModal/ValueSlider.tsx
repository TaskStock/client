import React from "react";
import Slider from "@react-native-community/slider";
import SliderThumb from "../../../../assets/images/slider-thumb.png";
import styled, { useTheme } from "styled-components/native";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import { AddTodoForm } from "../AddTodoModal";

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
  width: 3px;
  height: 10px;
  background-color: ${({ theme }) => theme.mainBtnGray};
  pointer-events: none;
  z-index: -1;
`;

export default function ValueSlider({
  addTodoForm,
  setAddTodoForm,
}: {
  addTodoForm: AddTodoForm;
  setAddTodoForm: React.Dispatch<React.SetStateAction<AddTodoForm>>;
}) {
  const onChangeSliderValue = (value: number) => {
    const level = value > 0 ? Math.floor(value / 1000) : 0;

    setAddTodoForm({
      ...addTodoForm,
      level: level,
    });
  };

  const theme = useTheme();

  return (
    <Slider
      minimumValue={0}
      maximumValue={5000}
      onValueChange={onChangeSliderValue}
      minimumTrackTintColor={theme.text}
      maximumTrackTintColor={theme.mainBtnGray}
      step={1000}
      tapToSeek={true}
      thumbImage={SliderThumb}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // paddingHorizontal: 5,
        // zIndex: -2,
      }}
    >
      <SliderGrid />
      <SliderGrid />
      <SliderGrid />
      <SliderGrid />
      <SliderGrid />
      <SliderGrid />
      <SliderLabel>
        <SliderLabelText>0</SliderLabelText>
        <SliderLabelText>5000</SliderLabelText>
      </SliderLabel>
    </Slider>
  );
}
