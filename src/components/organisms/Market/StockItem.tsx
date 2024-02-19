import styled, { useTheme } from "styled-components/native";
import { ContentItemBoxContainer } from "../../atoms/ContentItemBox";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import { spacing } from "../../../constants/spacing";
import { Pressable, View } from "react-native";
import FlexBox from "../../atoms/FlexBox";
import Text from "../../atoms/Text";
import { TextWithIcon } from "../../molecules/TextWithIcon";
import Icons from "../../atoms/Icons";
import Margin from "../../atoms/Margin";
import {
  ShadowForStockItem,
  ShadowForStockItem2,
} from "../../atoms/CustomShadow";

const StockItemBox = styled(ContentItemBoxContainer)`
  width: ${useResponsiveFontSize(150)}px;
  height: ${useResponsiveFontSize(175)}px;
`;

const StockItemSecondBox = styled(ContentItemBoxContainer)`
  border-radius: ${spacing.padding + spacing.small}px;
  background-color: ${({ theme }) => theme.box};
  padding: ${spacing.padding + spacing.small * 1.5}px ${spacing.offset}px;
`;

export const StockItem = ({
  id,
  name,
  percent,
  price,
  onPress,
}: {
  id: number;
  name: string;
  percent: number;
  price: number;
  onPress: () => void;
}) => {
  const theme = useTheme();
  // const percentFormat = percent.toFixed(2);
  const percentFormat = Math.floor(percent);

  return (
    <Pressable onPress={onPress}>
      <ShadowForStockItem radius={20}>
        <StockItemBox>
          <FlexBox
            direction="column"
            justifyContent="space-between"
            styles={{
              flex: 1,
            }}
          >
            <Text size="md" weight="bold" color={theme.text}>
              {name.length > 17 ? name.slice(0, 17) + "..." : name}
            </Text>
            <View
              style={{
                flex: 1,
              }}
            ></View>
            <View>
              <TextWithIcon
                text={percentFormat + "%"}
                size="sm"
                textColor={
                  percent == 0
                    ? theme.textDim
                    : percent > 0
                    ? theme.palette.red
                    : theme.palette.blue
                }
              >
                {percent != 0 ? (
                  percent > 0 ? (
                    <Icons
                      type="AntDesign"
                      name="caretup"
                      size={14}
                      color={theme.palette.red}
                    ></Icons>
                  ) : (
                    <Icons
                      type="AntDesign"
                      name="caretdown"
                      size={14}
                      color={theme.palette.blue}
                    ></Icons>
                  )
                ) : (
                  <Icons
                    type="materialIcons"
                    name="horizontal-rule"
                    size={14}
                    color={theme.textDim}
                  />
                )}
              </TextWithIcon>
              <Text size="xl" weight="bold">
                {price.toLocaleString()}
              </Text>
            </View>
          </FlexBox>
        </StockItemBox>
      </ShadowForStockItem>
    </Pressable>
  );
};

export const StockItemSecond = ({
  index,
  id,
  name,
  percent,
  onPress,
}: {
  index: number;
  id: number;
  name: string;
  percent: number;
  onPress: () => void;
}) => {
  const theme = useTheme();

  // const percentFormat = percent.toFixed(2);
  const percentFormat = Math.floor(percent);

  const textColor =
    percent != 0
      ? percent > 0
        ? theme.palette.red
        : theme.palette.blue
      : theme.textDim;

  return (
    <Pressable onPress={onPress}>
      {/* <ShadowForStockItem2 radius={20}> */}
      <StockItemSecondBox>
        <FlexBox gap={spacing.offset}>
          <Text size="md" weight="bold">
            {index}
          </Text>
          <View style={{ flex: 1 }}>
            <Text size="md" weight="medium">
              {name.length > 15 ? name.slice(0, 15) + "..." : name}
            </Text>
          </View>
          <TextWithIcon text={percentFormat + "%"} textColor={textColor}>
            {percent != 0 ? (
              percent > 0 ? (
                <Icons
                  type="AntDesign"
                  name="caretup"
                  size={14}
                  color={theme.palette.red}
                />
              ) : (
                <Icons
                  type="AntDesign"
                  name="caretdown"
                  size={14}
                  color={theme.palette.blue}
                />
              )
            ) : (
              <Icons
                type="materialIcons"
                name="horizontal-rule"
                size={14}
                color={theme.textDim}
              />
            )}
          </TextWithIcon>
        </FlexBox>
      </StockItemSecondBox>
      {/* </ShadowForStockItem2> */}
    </Pressable>
  );
};

export const StockItemForWishList = ({
  left,
  name,
  likes,
  isLiked,
  onPress,
}: {
  left: number | string;
  name: string;
  likes: number;
  isLiked: boolean;
  onPress: () => void;
}) => {
  return (
    <StockItemSecondBox>
      <FlexBox gap={spacing.offset}>
        <Text size="md" weight="bold">
          {left}
        </Text>
        <View style={{ flex: 1 }}>
          <Text size="md">
            {name.length > 15 ? name.slice(0, 15) + "..." : name}
          </Text>
        </View>
        <TextWithIcon text={likes + ""}>
          <>
            {isLiked ? (
              <Icons
                onPress={onPress}
                type="AntDesign"
                name="heart"
                size={18}
                color={"red"}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              />
            ) : (
              <Icons
                onPress={onPress}
                type="AntDesign"
                name="hearto"
                size={18}
                color={"red"}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              />
            )}
            <Margin
              direction="horizontal"
              margin={spacing.small * 0.5}
            ></Margin>
          </>
        </TextWithIcon>
      </FlexBox>
    </StockItemSecondBox>
  );
};

export const EmptyStockItem = () => {
  const theme = useTheme();
  return (
    <StockItemBox
      bgColor={theme.name === "dark" ? theme.box : theme.background}
      style={
        theme.name === "gray" && { borderColor: theme.textDim, borderWidth: 1 }
      }
    >
      <FlexBox
        direction="column"
        alignItems="center"
        justifyContent="center"
        styles={{ flex: 1 }}
      >
        <Text size="sm" color={theme.textDim}>
          아직 추가한
        </Text>
        <Text size="sm" color={theme.textDim} styles={{ paddingBottom: 10 }}>
          종목이 없어요.
        </Text>
        <Text size="xs" color={theme.textDim} styles={{ textAlign: "center" }}>
          ‘장 종목 확인하기’에서 종목을 할 일로 추가해보세요!
        </Text>
        {/* <Text size="xs" color={theme.textDim} styles={{ textAlign: "center" }}>
          종목을 할 일로 추가해보세요!
        </Text> */}
      </FlexBox>
    </StockItemBox>
  );
};
