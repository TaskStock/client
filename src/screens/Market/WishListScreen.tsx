import { Pressable, View } from "react-native";
import React from "react";
import PageHeader from "../../components/molecules/PageHeader";
import Section from "../../components/molecules/Section";
import Margin from "../../components/atoms/Margin";
import { spacing } from "../../constants/spacing";
import { TabView } from "react-native-tab-view";
import { useTab } from "../../hooks/useTab";
import TabHeader from "../../components/molecules/TabHeader";
import Text from "../../components/atoms/Text";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MarketStackParamList } from "../../navigators/MarketStack";
import ContentLayout from "../../components/atoms/ContentLayout";
import FlexBox from "../../components/atoms/FlexBox";
import { StockItemForWishList } from "../../components/organisms/Market/StockItem";

export default function WishListScreen() {
  const [index, setIndex] = React.useState(0);

  const navigation =
    useNavigation<NativeStackNavigationProp<MarketStackParamList>>();

  const onPressRegister = () => {
    navigation.navigate("WishRegisterScreen");
  };

  const tabHeaderProps = {
    navigationState: {
      index: index,
      routes: [
        { key: "1", title: "좋아요순" },
        { key: "2", title: "최신등록순" },
      ],
    },
  };

  return (
    <View style={{ flex: 1 }}>
      <PageHeader
        headerRight={
          <Pressable onPress={onPressRegister}>
            <Text size="md" weight={"medium"}>
              등록
            </Text>
          </Pressable>
        }
      />
      <View
        style={{
          paddingHorizontal: spacing.gutter,
          paddingVertical: spacing.offset,
        }}
      >
        <Section.HeaderText size={24} isMainText={true}>
          위시 종목
        </Section.HeaderText>
        <Margin margin={spacing.padding} />
        <Section.HeaderSubText size={15}>
          많은 분들이 원하시는 종목은 태스팀 검토 후
        </Section.HeaderSubText>
        <Margin margin={spacing.small} />
        <Section.HeaderSubText size={15}>
          새롭게 추가될 수 있어요!
        </Section.HeaderSubText>
      </View>
      <Margin margin={spacing.offset} />
      <TabHeader
        onPressTab={(i) => {
          setIndex(i);
        }}
        props={tabHeaderProps}
      />
      <ContentLayout>
        <FlexBox direction="column" alignItems="stretch" gap={spacing.padding}>
          {[1, 2, 3, 4, 5].map((v, i) => {
            return (
              <StockItemForWishList
                key={v + "wish"}
                left={i}
                likes={12}
                name="삼성전자"
                onPress={() => {}}
              ></StockItemForWishList>
            );
          })}
        </FlexBox>
      </ContentLayout>
    </View>
  );
}
