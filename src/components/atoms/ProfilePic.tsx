import React from "react";
import { Image } from "react-native";
import { convertSlash } from "../../utils/convertSlash";
import { getAPIHost } from "../../utils/getAPIHost";

const ProfilePic = ({
  image,
  strategy,
  size = 55,
}: {
  image: string;
  strategy: string;
  size?: number;
}) => {
  // const SERVER_URL = getAPIHost();
  // let uri;
  // switch (strategy) {
  //   case "local":
  //   case "apple":
  //     uri = convertSlash(SERVER_URL + image);
  //     break;
  //   default:
  //     uri = convertSlash(image);
  // }
  return (
    <>
      {image ? (
        <Image
          style={{ width: size, height: size, borderRadius: 50 }}
          source={{
            uri: image,
          }}
        />
      ) : (
        <Image
          style={{ width: size, height: size, borderRadius: 50 }}
          source={require("../../../assets/images/default_profile.png")}
        />
      )}
    </>
  );
};

export default ProfilePic;
