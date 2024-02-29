import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View } from "react-native";
import { useTheme } from "styled-components";
import styled from "styled-components/native";
import { spacing } from "../../../constants/spacing";
import { SnsStackParamList } from "../../../navigators/SnsStack";
import {
  useAppDispatch,
  useAppSelect,
} from "../../../store/configureStore.hooks";
import {
  cancelRequestThunk,
  followThunk,
  unfollowThunk,
} from "../../../utils/UserUtils/followThunk";
import numberWithCommas from "../../../utils/useNumberWithCommas";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import FlexBox from "../../atoms/FlexBox";
import FollowBtn from "../../atoms/FollowBtn";
import PrivateLockIcon from "../../atoms/PrivateLockIcon";
import ProfilePic from "../../atoms/ProfilePic";
import Text from "../../atoms/Text";

const Container = styled.Pressable`
  flex-direction: row;
  align-items: center;
  flex: 1;
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
  const navigation =
    useNavigation<NativeStackNavigationProp<SnsStackParamList>>();
  const dispatch = useAppDispatch();

  const current_user_id = useAppSelect((state) => state.user.user.user_id);

  const handleFollow = () => {
    switch (button) {
      case "팔로우":
      case "맞팔로우":
        dispatch(followThunk({ followingId: userId, isPrivate }));
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
      }}
    >
      <Container
        onPress={() => {
          navigation.navigate("SnsStack", {
            screen: "UserDetail",
            params: { userId: userId },
          });
        }}
      >
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
      {current_user_id !== userId && (
        <FollowBtn onPress={handleFollow} text={button} />
      )}
    </FlexBox>
  );
};

export default UserBox;
