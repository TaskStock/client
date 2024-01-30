import React from "react";
import { useTheme } from "styled-components";
import styled from "styled-components/native";
import FlexBox from "../../components/atoms/FlexBox";
import Text from "../../components/atoms/Text";
import PageHeader from "../../components/molecules/PageHeader";
import { spacing } from "../../constants/spacing";
import { FlatList } from "react-native";
import { IconsWithoutFeedBack } from "../../components/atoms/Icons";
import useResponsiveFontSize from "../../utils/useResponsiveFontSize";

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.box};
`;
const IconContainer = styled.View`
  width: ${useResponsiveFontSize(48)}px;
  height: ${useResponsiveFontSize(48)}px;
  align-items: center;
  justify-content: center;
`;
const AlarmContainer = styled.TouchableOpacity<{ read: boolean }>`
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: ${spacing.offset}px ${spacing.offset}px;
  background-color: ${({ theme, read }) =>
    read ? theme.background : theme.box};
`;

const Icon = ({ theme }) => {
  return (
    <IconContainer>
      <IconsWithoutFeedBack
        type="feather"
        name="trending-up"
        size={useResponsiveFontSize(30)}
        color={theme.high}
      />
    </IconContainer>
  );
};

const AlarmBox = ({
  title,
  createdAt,
  read = false,
  onPress,
}: {
  title: string;
  createdAt: string;
  read: boolean;
  onPress: () => void;
}) => {
  const theme = useTheme();
  return (
    <AlarmContainer read={read} onPress={onPress}>
      <Icon theme={theme} />
      <FlexBox
        direction="column"
        gap={spacing.padding}
        styles={{ paddingLeft: spacing.offset }}
      >
        <Text size="md">{title}</Text>
        <Text size="sm" color={theme.textDim}>
          {createdAt}
        </Text>
      </FlexBox>
    </AlarmContainer>
  );
};

const data = [
  {
    alarm_id: 1,
    user_id: 46,
    content: "test content",
    isread: false,
    created_date: "2023-12-28T18:28:20.718Z",
  },
  {
    alarm_id: 2,
    user_id: 46,
    content: "test content",
    isread: true,
    created_date: "2023-12-28T18:28:20.718Z",
  },
];

const AlarmScreen = ({ navigation }) => {
  return (
    <Container>
      <PageHeader title="알림" />
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <AlarmBox
            title={item.content}
            createdAt={item.created_date}
            read={item.isread}
            onPress={() => {}}
          />
        )}
        keyExtractor={(item, index) => item.alarm_id.toString()}
      />
    </Container>
  );
};

export default AlarmScreen;
