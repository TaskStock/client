import React from "react";
import { IconsWithoutFeedBack } from "./Icons";
import { useTheme } from "styled-components";

const PrivateLockIcon = ({ isPrivate }) => {
  const theme = useTheme();
  return (
    <>
      {isPrivate ? (
        <IconsWithoutFeedBack
          type="materialIcons"
          name="lock-outline"
          color={theme.textDim}
        />
      ) : null}
    </>
  );
};

export default PrivateLockIcon;
