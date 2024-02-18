import React from "react";
import { Image } from "react-native";

const ProfilePic = ({
  image,
  strategy,
  size = 55,
}: {
  image: string;
  strategy?: string;
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
          style={{ width: size, height: size, borderRadius: size }}
          source={{
            uri: image,
          }}
        />
      ) : (
        <Image
          style={{ width: size, height: size, borderRadius: size }}
          source={require("../../../assets/images/default_profile.png")}
        />
      )}
    </>
  );
};

export default ProfilePic;
