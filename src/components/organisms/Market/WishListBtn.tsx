import { useTheme } from "styled-components/native";
import { spacing } from "../../../constants/spacing";
import FlexBox from "../../atoms/FlexBox";
import Margin from "../../atoms/Margin";
import Text from "../../atoms/Text";
import { TextWithIcon } from "../../molecules/TextWithIcon";
import Icons from "../../atoms/Icons";
import { View } from "react-native";
import { MarketItemButton } from "./MarketButton";

export const WishListButton = ({ onPress }: { onPress: () => void }) => {
  const theme = useTheme();

  const textColor = theme.name === "dark" ? theme.text : theme.textReverse;

  const bgColor = "#212121";

  return (
    <MarketItemButton bgColor={bgColor} onPress={onPress}>
      <FlexBox
        direction="column"
        justifyContent="center"
        styles={{
          paddingHorizontal: spacing.padding,
          paddingVertical: spacing.small,
          flex: 1,
        }}
      >
        <Text size="xs" color={theme.palette.green} weight="bold">
          추가되었으면 하는 종목이 있나요?
        </Text>
        <Margin margin={spacing.small}></Margin>
        <Text size="lg" color={textColor} weight={"extraBold"}>
          태스팀에게 알려주세요!
        </Text>
        <View
          style={{
            position: "absolute",
            right: 0,
            bottom: -5,
          }}
        >
          <TextWithIcon
            iconPosition="right"
            text={"위시종목 등록하기"}
            textColor={textColor}
            size="xs"
          >
            <Icons
              type="AntDesign"
              name="right"
              size={10}
              color={textColor}
            ></Icons>
          </TextWithIcon>
        </View>
      </FlexBox>
    </MarketItemButton>
  );
};
