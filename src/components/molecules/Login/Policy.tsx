import React from "react";
import { TouchableOpacity } from "react-native";
import { useTheme } from "styled-components";
import styled from "styled-components/native";
import { spacing } from "../../../constants/spacing";
import FlexBox from "../../atoms/FlexBox";
import Text from "../../atoms/Text";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: ${spacing.small}px;
`;

const Policy = ({ serviceOnPress, privacyOnPress }) => {
  const theme = useTheme();

  return (
    <Container>
      <FlexBox>
        <Text size="xs" color={theme.textDim}>
          계속 진행하면 Taskstock의
        </Text>
        <TouchableOpacity
          onPress={serviceOnPress}
          style={{
            borderBottomWidth: 1,
            borderColor: theme.text,
          }}
        >
          <Text size="xs" color={theme.text}>
            {" "}
            서비스 약관{" "}
          </Text>
        </TouchableOpacity>
        <Text size="xs" color={theme.textDim}>
          및{" "}
        </Text>
        <TouchableOpacity
          onPress={privacyOnPress}
          style={{
            borderBottomWidth: 1,
            borderColor: theme.text,
          }}
        >
          <Text size="xs" color={theme.text}>
            개인정보 보호정책
          </Text>
        </TouchableOpacity>
        <Text size="xs" color={theme.textDim}>
          에
        </Text>
      </FlexBox>
      <Text size="xs" color={theme.textDim}>
        동의한 것으로 간주합니다.
      </Text>
    </Container>
  );
};

export default Policy;
