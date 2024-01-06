import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { darkTheme, grayTheme } from "../../../constants/colors";
import { spacing } from "../../../constants/spacing";
import { useAppSelect } from "../../../store/configureStore.hooks";
import FlexBox from "../../atoms/FlexBox";
import Text from "../../atoms/Text";

const THEME_SOURCES = {
  dark: {
    text: darkTheme.text,
    subText: darkTheme.textDim,
  },
  gray: {
    text: grayTheme.text,
    subText: grayTheme.textDim,
  },
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: ${spacing.small}px;
`;

const Policy = ({ serviceOnPress, privacyOnPress }) => {
  const theme = useAppSelect((state) => state.theme.value);
  const navigation = useNavigation();
  return (
    <Container>
      <FlexBox>
        <Text size="xs" color={THEME_SOURCES[theme].subText}>
          계속 진행하면 Taskstock의
        </Text>
        <TouchableOpacity
          onPress={serviceOnPress}
          style={{
            borderBottomWidth: 1,
            borderColor: THEME_SOURCES[theme].text,
          }}
        >
          <Text size="xs" color={THEME_SOURCES[theme].text}>
            {" "}
            서비스 약관{" "}
          </Text>
        </TouchableOpacity>
        <Text size="xs" color={THEME_SOURCES[theme].subText}>
          및{" "}
        </Text>
        <TouchableOpacity
          onPress={privacyOnPress}
          style={{
            borderBottomWidth: 1,
            borderColor: THEME_SOURCES[theme].text,
          }}
        >
          <Text size="xs" color={THEME_SOURCES[theme].text}>
            개인정보 보호정책
          </Text>
        </TouchableOpacity>
        <Text size="xs" color={THEME_SOURCES[theme].subText}>
          에
        </Text>
      </FlexBox>
      <Text size="xs" color={THEME_SOURCES[theme].subText}>
        동의한 것으로 간주합니다.
      </Text>
    </Container>
  );
};

export default Policy;
