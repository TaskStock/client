import React from "react";
import styled from "styled-components/native";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import Text from "../../atoms/Text";

const Container = styled.View`
  position: absolute;
  top: -70%;
  background-color: rgba(0, 0, 0, 0.8);
  padding: ${useResponsiveFontSize(6)}px ${useResponsiveFontSize(20)}px;
  border-radius: ${useResponsiveFontSize(14)}px;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
`;
const Polygon = styled.View`
  position: absolute;
  bottom: -${useResponsiveFontSize(12)}px;
  width: 0;
  height: 0;
  background-color: transparent;
  border-style: solid;
  border-left-width: ${useResponsiveFontSize(6)}px;
  border-right-width: ${useResponsiveFontSize(6)}px;
  border-top-width: ${useResponsiveFontSize(13)}px;
  border-left-color: transparent;
  border-right-color: transparent;
  border-top-color: rgba(0, 0, 0, 0.8);
  justify-content: center;
  align-items: center;
`;

const RecentlyLogginIn = ({ shown = false }: { shown?: boolean }) => {
  if (!shown) return null;
  return (
    <Container>
      <Polygon />
      <Text size="xs" weight={"semibold"} color="white">
        최근에 로그인했어요.
      </Text>
    </Container>
  );
};

export default RecentlyLogginIn;
