import { Pressable } from "react-native";
import ContentItemBox from "../../atoms/ContentItemBox";
import { useTheme } from "styled-components/native";

export const MarketItemButton = ({
  children,
  onPress,
  bgColor,
}: {
  children: React.ReactNode;
  onPress?: () => void;
  bgColor?: string;
}) => {
  return (
    <Pressable onPress={onPress}>
      <ContentItemBox height={95} bgColor={bgColor}>
        {children}
      </ContentItemBox>
    </Pressable>
  );
};
