import React, { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import FlexBox from "../../components/atoms/FlexBox";
import Icons from "../../components/atoms/Icons";
import Text from "../../components/atoms/Text";
import { spacing } from "../../constants/spacing";
import useHeight from "../../hooks/useHeight";
import { useAppDispatch, useAppSelect } from "../../store/configureStore.hooks";
import { pickTheme } from "../../store/modules/theme";
import { darkTheme, grayTheme } from "../../constants/colors";

const TempTheme = {
  dark: {
    background: darkTheme.background,
    text: darkTheme.text,
  },
  gray: {
    background: grayTheme.background,
    text: grayTheme.text,
  },
};

const Container = styled.View`
  padding: ${spacing.offset}px;
  flex-direction: row;
  gap: ${spacing.padding}px;
`;

const HeaderContainer = styled.View<{ notchTop: number }>`
  padding: ${(props) => props.notchTop + spacing.padding}px ${spacing.offset}px
    ${spacing.padding}px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const OuterCircle = styled.View<{ selectedTheme: string }>`
  width: 15px;
  height: 15px;
  border-radius: 15px;
  border: 2px solid ${({ selectedTheme }) => TempTheme[selectedTheme].text};
  justify-content: center;
  align-items: center;
`;
const InnerCircle = styled.View<{ selectedTheme: string }>`
  width: 7px;
  height: 7px;
  border-radius: 7px;
  background-color: ${({ selectedTheme }) => TempTheme[selectedTheme].text};
`;
const CheckCircle = ({ selected, selectedTheme }) => {
  return (
    <OuterCircle selectedTheme={selectedTheme}>
      {selected && <InnerCircle selectedTheme={selectedTheme} />}
    </OuterCircle>
  );
};

const SelectBox = ({ type, selected, selectedTheme, setSelectedTheme }) => {
  let imageSrc;
  let themeName;
  switch (type) {
    case "dark":
      themeName = "다크";
      imageSrc = require("../../../assets/images/theme-dark.png");
      break;
    case "gray":
      themeName = "라이트";
      imageSrc = require("../../../assets/images/theme-light.png");
      break;
  }
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        justifyContent: "space-between",
      }}
      onPress={() => setSelectedTheme(type)}
    >
      <Image
        source={imageSrc}
        style={{
          width: "100%",
          height: 150,
          resizeMode: "contain",
        }}
      />
      <FlexBox alignItems="center" gap={spacing.padding}>
        <CheckCircle selected={selected} selectedTheme={selectedTheme} />
        <Text size="md" color={TempTheme[selectedTheme].text}>
          {themeName}
        </Text>
      </FlexBox>
    </TouchableOpacity>
  );
};

const ThemeScreen = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { NOTCH_TOP } = useHeight();

  const { value } = useAppSelect((state) => state.theme);
  const [selectedTheme, setSelectedTheme] = useState(value);

  const handleSave = () => {
    switch (selectedTheme) {
      case "dark":
        dispatch(pickTheme("dark"));
        navigation.goBack();
        break;
      case "gray":
        dispatch(pickTheme("gray"));
        navigation.goBack();
        break;
    }
  };

  const HeaderLeft = () => (
    <Icons
      type="feather"
      name="chevron-left"
      size={35}
      color={TempTheme[selectedTheme].text}
      onPress={() => {
        navigation.goBack();
      }}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    />
  );
  const SaveBtn = ({ onPress }) => (
    <TouchableOpacity onPress={onPress}>
      <Text size="md" weight="semibold" color={TempTheme[selectedTheme].text}>
        저장
      </Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={{ backgroundColor: TempTheme[selectedTheme].background, flex: 1 }}
    >
      <HeaderContainer notchTop={NOTCH_TOP}>
        <HeaderLeft />
        <Text size="lg" weight="semibold" color={TempTheme[selectedTheme].text}>
          테마 변경
        </Text>
        <SaveBtn onPress={handleSave} />
      </HeaderContainer>

      <Container>
        <SelectBox
          type="dark"
          selected={selectedTheme === "dark"}
          selectedTheme={selectedTheme}
          setSelectedTheme={setSelectedTheme}
        />
        <SelectBox
          type="gray"
          selected={selectedTheme === "gray"}
          selectedTheme={selectedTheme}
          setSelectedTheme={setSelectedTheme}
        />
      </Container>
    </View>
  );
};

export default ThemeScreen;
