import React from "react";
import { useTheme } from "styled-components";
import Icons from "./Icons";

const PrivateLockIcon = ({ isPrivate }) => {
  const theme = useTheme();
  return (
    <>
      {isPrivate ? (
        <Icons type="materialIcons" name="lock-outline" color={theme.textDim} />
      ) : null}
    </>
  );
};

export default PrivateLockIcon;
