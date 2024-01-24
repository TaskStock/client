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
          <Text size="md" weight="bold">
            {username}
          </Text>
          <Text size="sm" color={theme.textDim}>
            {numberWithCommas(value)}원
          </Text>
        </View>

        <PrivateLockIcon isPrivate={isPrivate} />
      </Container>
      <FollowBtn onPress={handleFollow} text={button} />
    </FlexBox>
  );
};

export default UserBox;
