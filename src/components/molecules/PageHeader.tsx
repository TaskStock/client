import { useNavigation } from "@react-navigation/core";
import React, { useContext } from "react";
import { useTheme } from "styled-components";
import styled from "styled-components/native";
import { spacing } from "../../constants/spacing";
import useHeight from "../../hooks/useHeight";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";
import Icons from "../atoms/Icons";
import Text from "../atoms/Text";
import { ComponentHeightContext } from "../../utils/ComponentHeightContext";
import { useResizeLayoutOnFocus } from "../../hooks/useResizeLayoutOnFocus";
import { View } from "react-native";

const Container = styled.View<{ notchTop: number }>`
  padding: ${(props) => props.notchTop + spacing.padding}px ${spacing.offset}px
    ${spacing.padding}px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;
const Blank = styled.View`
  width: ${useResponsiveFontSize(35)}px;
  height: ${useResponsiveFontSize(35)}px;
`;
const Title = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const PageHeader = ({
  headerLeftShown = true,
  headerRight,
  title,
  headerLeftColorReverse = false,
}: {
  headerLeftShown?: boolean;
  headerRight?: React.ReactNode;
  title?: string;
  headerLeftColorReverse?: boolean;
}) => {
  const { NOTCH_TOP } = useHeight();
  const theme = useTheme();
  const navigation = useNavigation();

  const headerLeftColor = headerLeftColorReverse
    ? theme.background
    : theme.text;

  const HeaderLeft = () => (
    <Icons
      type="feather"
      name="chevron-left"
      size={35}
      color={headerLeftColor}
      onPress={() => {
        navigation.goBack();
      }}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    />
  );
  const { setHeaderHeight } = useContext(ComponentHeightContext);

  const onLayout = useResizeLayoutOnFocus({
    resizeFunction: setHeaderHeight,
  });

  return (
    <Container notchTop={NOTCH_TOP} onLayout={onLayout}>
      {headerLeftShown ? <HeaderLeft /> : <Blank />}
      {title && (
        <Text size="lg" weight="semibold">
          {title}
        </Text>
      )}
      {headerRight ? headerRight : <Blank />}
    </Container>
  );
};

export const AbsolutePageHeader = ({
  title,
  headerLeftColorReverse = false,
}: {
  title?: string;
  headerLeftColorReverse?: boolean;
}) => {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
      }}
    >
      <PageHeader
        title={title}
        headerLeftColorReverse={headerLeftColorReverse}
      />
    </View>
  );
};

export default PageHeader;
