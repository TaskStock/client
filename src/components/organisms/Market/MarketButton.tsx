import { Pressable } from "react-native";
import ContentItemBox from "../../atoms/ContentItemBox";

export const MarketItemButton = ({
  children,
  reversed,
  onPress,
}: {
  children: React.ReactNode;
  reversed?: boolean;
  onPress?: () => void;
}) => {
  return (
    <Pressable onPress={onPress}>
      <ContentItemBox height={95} reversed={reversed}>
        {children}
      </ContentItemBox>
    </Pressable>
  );
};
