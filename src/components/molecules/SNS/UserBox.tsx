import { Image, View } from "react-native";
import FlexBox from "../../atoms/FlexBox";
import Text from "../../atoms/Text";
import styled from "styled-components/native";
import { convertSlash } from "../../../utils/convertSlash";
import { getAPIHost } from "../../../utils/getAPIHost";
import ProfilePic from "../../atoms/ProfilePic";

const BlankImage = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color: gray;
`;

const UserBox = ({ username, rank, value, image, strategy }) => {
  return (
    <FlexBox>
      <Text size="sm">{rank}</Text>
      <ProfilePic image={image} strategy={strategy} />
      {/* {image ? (
        <Image
          style={{ width: 50, height: 50, borderRadius: 50 }}
          source={{
            uri: uri,
          }}
        />
      ) : (
        <BlankImage />
      )} */}
      <View>
        <Text size="lg">{username}</Text>
        <Text size="lg">{value}</Text>
      </View>
    </FlexBox>
  );
};

export default UserBox;
