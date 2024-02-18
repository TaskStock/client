import { TouchableOpacity, View } from "react-native";
import React from "react";
import FlexBox from "../../atoms/FlexBox";
import Text from "../../atoms/Text";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import styled from "styled-components/native";
import Icons from "../../atoms/Icons";
import { useTheme } from "styled-components";
import { spacing } from "../../../constants/spacing";
import user from "../../../store/modules/user";
import { Challengers } from "../../../@types/stock";
import { Image } from "react-native";

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
              <Image
                source={{ uri: user.image }}
                style={{
                  width: useResponsiveFontSize(27),
                  height: useResponsiveFontSize(27),
                  resizeMode: "contain",
                }}
              />
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
          <Text size="sm">{count}명 실천중</Text>
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
