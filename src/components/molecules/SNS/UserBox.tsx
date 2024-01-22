import { TouchableOpacity, View } from "react-native";
import { useTheme } from "styled-components";
import styled from "styled-components/native";
import { spacing } from "../../../constants/spacing";
import numberWithCommas from "../../../utils/useNumberWithCommas";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import ProfilePic from "../../atoms/ProfilePic";
import Text from "../../atoms/Text";
import { useNavigation } from "@react-navigation/native";
import FlexBox from "../../atoms/FlexBox";
import { useState } from "react";
import { useAppDispatch } from "../../../store/configureStore.hooks";
import { followThunk } from "../../../utils/UserUtils/followThunk";

const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

const FollowBtnContainer = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.box};
  padding: ${spacing.small}px ${useResponsiveFontSize(16)}px;
  border-radius: ${spacing.small}px;
`;

const FollowBtn = ({ onPress, text }) => {
  return (
    <FollowBtnContainer onPress={onPress}>
      <Text size="sm">{text}</Text>
    </FollowBtnContainer>
  );
};

const UserBox = ({ username, rank, value, image, strategy, userId }) => {
  const theme = useTheme();
  const navigation = useNavigation() as any;
  const dispatch = useAppDispatch();

  const [followed, setFollowed] = useState(false);

  const handleFollow = () => {
    dispatch(followThunk(userId));
    setFollowed((prev) => !prev);
  };

  return (
    <FlexBox
      justifyContent="space-between"
      alignItems="center"
      styles={{
        paddingVertical: spacing.padding,
        paddingHorizontal: useResponsiveFontSize(15),
      }}
    >
      <Container onPress={() => navigation.navigate("UserDetail")}>
        <Text
          size="sm"
          color={theme.textDim}
          styles={{ paddingRight: spacing.offset }}
        >
          {rank}
        </Text>
        <ProfilePic
          image={image}
          strategy={strategy}
          size={useResponsiveFontSize(36)}
        />

        <View style={{ paddingLeft: useResponsiveFontSize(15) }}>
          <Text size="md" weight="bold">
            {username}
          </Text>
          <Text size="sm" color={theme.textDim}>
            {numberWithCommas(value)}원
          </Text>
        </View>
      </Container>
      <FollowBtn onPress={handleFollow} text={followed ? "팔로잉" : "팔로우"} />
    </FlexBox>
  );
};

export default UserBox;
