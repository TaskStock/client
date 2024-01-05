import React from "react";
import Slider from "@react-native-community/slider";
import SliderThumb from "../../../../assets/images/slider-thumb.png";
import styled, { useTheme } from "styled-components/native";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import { useDispatch } from "react-redux";
import { setAddTodoForm } from "../../../store/modules/todo";
import { useAppSelect } from "../../../store/configureStore.hooks";

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

export default function ValueSlider() {
  const dispatch = useDispatch();

  const sliderValue = useAppSelect((state) => state.todo.addTodoForm.level);

  const onChangeSliderValue = (value: number) => {
    const level = value > 0 ? Math.floor(value / 1000) : 0;

    dispatch(setAddTodoForm({ name: "level", value: level }));
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
      value={sliderValue * 1000}
      thumbImage={SliderThumb}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
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
