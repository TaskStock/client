import React from "react";
import { IconsWithoutFeedBack } from "./Icons";

const PrivateLockIcon = ({ isPrivate }) => {
  return (
    <>
      {isPrivate ? (
        <IconsWithoutFeedBack type="materialIcons" name="lock-outline" />
      ) : (
        <IconsWithoutFeedBack type="materialIcons" name="lock-open" />
      )}
    </>
  );
};

export default PrivateLockIcon;
