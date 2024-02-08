import { View, ScrollView } from "react-native";
import React, { useRef } from "react";
import styled, { useTheme } from "styled-components/native";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import FlexBox from "../../atoms/FlexBox";
import { spacing } from "../../../constants/spacing";
import Text from "../../atoms/Text";
import Margin from "../../atoms/Margin";
import { editRetrospectForm } from "../../../store/modules/retrospect/retrospect";
import LoadingSpinner from "../../atoms/LoadingSpinner";
import { Retrospect } from "../../../@types/retrospect";
import { useProject } from "../../../hooks/useProject";
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { useAppDispatch } from "../../../store/configureStore.hooks";
import { DateString } from "../../../@types/calendar";
import { ProjectStackParamList } from "../../../navigators/ProjectStack";
import _ from "lodash";

const Box = styled.Pressable`
  background-color: ${({ theme }) => theme.box};
  padding: ${useResponsiveFontSize(20)}px;
  border-radius: 20px;

  flex: 1;

  /* 안드로이드용 */
  elevation: 2;

  /* IOS용으로 추가 */
  shadow-color: #000;
  shadow-offset: 0px 4px;
  /* shadow-opacity: 0.1; */
  shadow-radius: 10px;
`;

function RetrospectItem({
  item,
  projectName,
  onPressItem,
}: {
  item: Retrospect;
  projectName: string;
  onPressItem: () => void;
}) {
  const formattedDate = item.created_date.slice(0, 10);

  return (
    <Box onPress={onPressItem}>
      <FlexBox gap={spacing.small}>
        <Text size="xs" color="red">
          {projectName}
        </Text>
        <Text size="xs">{formattedDate}</Text>
      </FlexBox>
      <Margin margin={spacing.small}></Margin>
      <Text size="md">
        {item.content.length > 100
          ? item.content.slice(0, 100) + "..."
          : item.content}
      </Text>
    </Box>
  );
}

export default function RetrospectList({
  list,
  isLoading,
  isError,
  onScrollBottom,
}: {
  list: Retrospect[] | undefined;
  isLoading: boolean;
  isError: boolean;
  onScrollBottom: () => void;
}) {
  const { findProjectNameById } = useProject();

  const navigation = useNavigation<NavigationProp<ProjectStackParamList>>();

  const dispatch = useAppDispatch();

  const throttleScrollEnd = useRef(
    _.throttle(() => {
      onScrollBottom();
    }, 2000)
  ).current;

  const handleScroll = (event) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const paddingToBottom = 10; // Adjust this value based on your needs

    if (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    ) {
      throttleScrollEnd();
    }
  };

  const onPressRetrospectItem = (item) => () => {
    dispatch(
      editRetrospectForm({
        retrospect_id: item.retrospect_id,
        project_id: item.project_id,
        content: item.content,
        date: item.created_date.slice(0, 10) as DateString,
      })
    );
    navigation.navigate("RetrospectWrite");
  };

  return (
    <ScrollView
      onScroll={handleScroll}
      scrollEventThrottle={50} //
    >
      <FlexBox
        gap={spacing.offset}
        direction="column"
        alignItems="stretch"
        styles={{
          flex: 1,
        }}
      >
        {isLoading ? (
          <FlexBox
            justifyContent="center"
            alignItems="center"
            styles={{ flex: 1 }}
          >
            <LoadingSpinner></LoadingSpinner>
          </FlexBox>
        ) : isError ? (
          <Text size="md">에러</Text>
        ) : list && list.length !== 0 ? (
          list.map((item) => {
            const projectName = findProjectNameById(item.project_id);

            return (
              <RetrospectItem
                item={item}
                key={item.retrospect_id + "retrospect"}
                projectName={projectName || ""}
                onPressItem={onPressRetrospectItem(item)}
              ></RetrospectItem>
            );
          })
        ) : (
          <Text size="md">회고가 없습니다.</Text>
        )}
      </FlexBox>
    </ScrollView>
  );
}
