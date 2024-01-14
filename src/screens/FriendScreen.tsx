import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import FixedBottomDrawer from "../components/molecules/Home/FixedBottomDrawer";
import Text from "../components/atoms/Text";
import { ComponentHeightContext } from "../utils/ComponentHeightContext";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const FriendScreen = () => {
  const [openState, setOpenState] = useState(0);
  const [closedState, setClosedState] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setOpenState(-400);
    }, 1000);
  }, []);
  const { DEFAULT_HEIGHT, OPEN_STATE } = useContext(ComponentHeightContext);
  console.log("DEFAULT_HEIGHT", DEFAULT_HEIGHT);
  console.log("OPEN_STATE", OPEN_STATE);

  return (
    <Container>
      {OPEN_STATE !== 0 && DEFAULT_HEIGHT !== 0 && (
        <FixedBottomDrawer openState={OPEN_STATE} closedState={DEFAULT_HEIGHT}>
          <Text size="lg" weight="semibold">
            TestTest
          </Text>
        </FixedBottomDrawer>
      )}
    </Container>
  );
};

export default FriendScreen;
