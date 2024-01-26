import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { useTheme } from "styled-components";
import styled from "styled-components/native";
import { spacing } from "../../../constants/spacing";
import { useAppDispatch } from "../../../store/configureStore.hooks";
import {
  cancelRequestThunk,
  followThunk,
  unfollowThunk,
} from "../../../utils/UserUtils/followThunk";
import numberWithCommas from "../../../utils/useNumberWithCommas";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import FlexBox from "../../atoms/FlexBox";
import PrivateLockIcon from "../../atoms/PrivateLockIcon";
import ProfilePic from "../../atoms/ProfilePic";
import Text from "../../atoms/Text";

const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

const FollowBtnContainer = styled.TouchableOpacity<{ color: string }>`
  background-color: ${({ theme, color }) =>
    color === "inactive" ? theme.text : theme.subBtnGray};
  padding: ${useResponsiveFontSize(8)}px ${useResponsiveFontSize(16)}px;
  border-radius: ${spacing.small}px;
`;

const UserBox = ({
  username,
  value,
  image,
  strategy,
  userId,
  isPrivate,
  isPending,
  isFollowingMe,
  isFollowingYou,
  button,
}) => {
  const theme = useTheme();
  const navigation = useNavigation() as any;
  const dispatch = useAppDispatch();

  const FollowBtn = ({ onPress, text }) => {
    return (
      <FollowBtnContainer
        onPress={onPress}
        color={text === "팔로우" || text === "맞팔로우" ? "inactive" : "active"}
      >
        <Text
          size="sm"
          color={
            text === "팔로우" || text === "맞팔로우"
              ? theme.textReverse
              : theme.text
          }
        >
          {text}
        </Text>
      </FollowBtnContainer>
    );
  };

  const handleFollow = () => {
    switch (button) {
      case "팔로우":
      case "맞팔로우":
        dispatch(followThunk(userId));
        break;
      case "팔로잉":
        dispatch(unfollowThunk(userId));
        break;
      case "요청됨":
        dispatch(cancelRequestThunk(userId));
        break;
    }
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
        <ProfilePic
          image={image}
          strategy={strategy}
          size={useResponsiveFontSize(36)}
        />

        <View
          style={{ paddingLeft: useResponsiveFontSize(15), paddingRight: 20 }}
        >
          <FlexBox gap={spacing.padding} alignItems="center">
            <Text size="md" weight="bold">
              {username}
            </Text>
            <PrivateLockIcon isPrivate={isPrivate} />
          </FlexBox>
          <Text size="sm" color={theme.textDim}>
            {numberWithCommas(value)}원
          </Text>
        </View>
      </Container>
      <FollowBtn onPress={handleFollow} text={button} />
    </FlexBox>
  );
};

export default UserBox;
