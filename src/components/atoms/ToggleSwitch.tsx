import React from "react";
import { Switch } from "react-native";
import { useTheme } from "styled-components";

const ToggleSwitch = ({ isEnabled, setIsEnabled, toggleSwitch }) => {
  const theme = useTheme();
  const handleToggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    toggleSwitch();
  };
  return (
    <Switch
      trackColor={{ false: theme.textDim, true: theme.text }}
      thumbColor={isEnabled ? theme.box : theme.box}
      ios_backgroundColor={theme.textDim}
      onValueChange={handleToggleSwitch}
      value={isEnabled}
      style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
    />
  );
};

export default ToggleSwitch;
