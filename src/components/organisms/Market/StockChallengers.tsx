import React from "react";
import { TouchableOpacity } from "react-native";
import { useTheme } from "styled-components";
import styled from "styled-components/native";
import { Challengers } from "../../../@types/stock";
import { spacing } from "../../../constants/spacing";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import FlexBox from "../../atoms/FlexBox";
import Icons from "../../atoms/Icons";
import ProfilePic from "../../atoms/ProfilePic";
import Text from "../../atoms/Text";

const CircleContainer = styled.View`
  width: ${useResponsiveFontSize(27)}px;
  height: ${useResponsiveFontSize(27)}px;
  border-radius: ${useResponsiveFontSize(27)}px;
  background-color: ${({ theme }) => theme.text};
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.box};
`;

const StockChallengers = ({
  count,
  userListPreview,
  onPress,
}: {
  count: number;
  userListPreview: Challengers[];
  onPress: () => void;
}) => {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <FlexBox alignItems="center" justifyContent="space-between">
        <FlexBox
          gap={-useResponsiveFontSize(8)}
          alignItems="center"
          justifyContent="center"
        >
          {userListPreview.map((user) => (
            <CircleContainer key={user.user_id}>
              <ProfilePic image={user.image} size={useResponsiveFontSize(27)} />
            </CircleContainer>
          ))}
          {userListPreview.length === 5 && (
            <Icons
              type="feather"
              name="plus"
              color={theme.textDim}
              size={useResponsiveFontSize(20)}
              style={{ marginLeft: spacing.padding }}
            />
          )}
        </FlexBox>
        <FlexBox alignItems="center" gap={8}>
          <Text size="sm">{count.toString()}명 실천중</Text>
          <Icons
            type="entypo"
            name="chevron-thin-right"
            color={theme.text}
            size={useResponsiveFontSize(15)}
          />
        </FlexBox>
      </FlexBox>
    </TouchableOpacity>
  );
};

export default StockChallengers;
