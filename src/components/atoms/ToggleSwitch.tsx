import React from "react";
import { Switch } from "react-native";
import { useTheme } from "styled-components";
import { useAppSelect } from "../../store/configureStore.hooks";

const CONSTANTS = {
  dark: {
    on: "#4DDE48",
    off: "#fff",
    ball: "#000",
  },
  gray: {
    on: "#000",
    off: "#949496",
    ball: "#fff",
  },
};

const ToggleSwitch = ({ isEnabled, setIsEnabled, toggleSwitch }) => {
  const { value: theme } = useAppSelect((state) => state.theme);
  const handleToggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    toggleSwitch();
  };
  return (
    <Switch
      trackColor={{ false: CONSTANTS[theme].off, true: CONSTANTS[theme].on }}
      thumbColor={CONSTANTS[theme].ball}
      ios_backgroundColor={CONSTANTS[theme].off}
      onValueChange={handleToggleSwitch}
      value={isEnabled}
      style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
    />
  );
};

export default ToggleSwitch;
