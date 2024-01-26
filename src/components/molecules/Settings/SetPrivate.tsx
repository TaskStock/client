import React, { useState } from "react";
import FlexBox from "../../atoms/FlexBox";
import Text from "../../atoms/Text";
import { Switch } from "react-native";
import {
  useAppDispatch,
  useAppSelect,
} from "../../../store/configureStore.hooks";
import { setPrivateThunk } from "../../../utils/UserUtils/setPrivate";

const SetPrivate = () => {
  const { private: isPrivate } = useAppSelect((state) => state.user.user);
  const dispatch = useAppDispatch();
  const [isEnabled, setIsEnabled] = useState<boolean>(isPrivate);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    dispatch(setPrivateThunk(!isEnabled));
  };
  return (
    <FlexBox justifyContent="space-between">
      <Text size="md">공개/비공개</Text>
      <Switch
        trackColor={{ false: "#f4f3f4", true: "#007AFF" }}
        thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </FlexBox>
  );
};

export default SetPrivate;
