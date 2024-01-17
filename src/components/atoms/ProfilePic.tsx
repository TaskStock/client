import React from "react";
import { Image } from "react-native";
import styled from "styled-components/native";
import { convertSlash } from "../../utils/convertSlash";
import { getAPIHost } from "../../utils/getAPIHost";

const BlankImage = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color: gray;
`;

const ProfilePic = ({ image, strategy }) => {
  const SERVER_URL = getAPIHost();
  let uri;
  if (strategy === "local") {
    uri = convertSlash(SERVER_URL + image);
  } else {
    uri = convertSlash(image);
  }
  return (
    <>
      {image ? (
        <Image
          style={{ width: 50, height: 50, borderRadius: 50 }}
          source={{
            uri: uri,
          }}
        />
      ) : (
        <BlankImage />
      )}
    </>
  );
};

export default ProfilePic;
