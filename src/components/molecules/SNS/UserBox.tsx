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

const FollowBtn = ({ onPress }) => {
  return (
    <FollowBtnContainer onPress={onPress}>
      <Text size="sm">팔로우</Text>
    </FollowBtnContainer>
  );
};

const UserBox = ({ username, rank, value, image, strategy }) => {
  const theme = useTheme();
  const navigation = useNavigation() as any;
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
      <FollowBtn onPress={() => {}} />
    </FlexBox>
  );
};

export default UserBox;
