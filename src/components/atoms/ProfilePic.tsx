import React from "react";
import { Image } from "react-native";
import styled from "styled-components/native";
import { convertSlash } from "../../utils/convertSlash";
import { getAPIHost } from "../../utils/getAPIHost";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";

const BlankImage = styled.View<{ size: number }>`
  width: ${(props) => useResponsiveFontSize(props.size)}px;
  height: ${(props) => useResponsiveFontSize(props.size)}px;
  border-radius: ${(props) => useResponsiveFontSize(props.size)}px;
  background-color: ${({ theme }) => theme.mainBtnReversed};
`;

const ProfilePic = ({
  image,
  strategy,
  size = 55,
}: {
  image: string;
  strategy: string;
  size?: number;
}) => {
  const SERVER_URL = getAPIHost();
  let uri;
  if (strategy === "local" || strategy === "apple") {
    uri = convertSlash(SERVER_URL + image);
  } else {
    uri = convertSlash(image);
  }
  return (
    <>
      {image ? (
        <Image
          style={{ width: size, height: size, borderRadius: 50 }}
          source={{
            uri: uri,
          }}
        />
      ) : (
        <BlankImage size={size} />
      )}
    </>
  );
};

export default ProfilePic;
