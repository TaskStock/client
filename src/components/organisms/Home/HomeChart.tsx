import React, { memo } from "react";
import { Pressable } from "react-native";
import styled from "styled-components/native";
import { Value } from "../../../@types/chart";
import useWagmiCandleStick from "../../../hooks/useWagmiCandleStick";
import CenterLayout from "../../atoms/CenterLayout";
import FlexBox from "../../atoms/FlexBox";
import LoadingSpinner from "../../atoms/LoadingSpinner";
import Text from "../../atoms/Text";
import LineValueChart from "../../molecules/LineValueChart";
import WagmiChart from "../../molecules/WagmiChart";
import { spacing } from "../../../constants/spacing";

const Container = styled.View`
  width: 100%;
  height: 100%;
  padding: ${spacing.padding}px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
`;

function HomeChart({
  isCandleStick,
  value: { data, isLoading, isError, error, refetch },
  width,
  height,
}: {
  isCandleStick: boolean;
  value: {
    data: Value[] | undefined;
    isLoading: boolean;
    isError: boolean;
    error: any;
    refetch: () => void;
  };
  width: number;
  height: number;
}) {
  if (isLoading || !data) {
    return (
      <FlexBox justifyContent="center" alignItems="center" styles={{ flex: 1 }}>
        <LoadingSpinner />
      </FlexBox>
    );
  }

  if (isError) {
    return (
      <CenterLayout>
        <Text size="md">에러가 발생했습니다.</Text>
        <Pressable onPress={refetch}>
          <Text size="md">다시 시도해주세요.</Text>
        </Pressable>
      </CenterLayout>
    );
  }

  const { data: wagmiData } = useWagmiCandleStick({
    data: data,
  });

  const widthWithPadding = width - spacing.padding * 2;
  const heightWithPadding = height - spacing.padding * 2;

  return (
    <Container>
      {isCandleStick ? (
        <WagmiChart
          data={wagmiData}
          width={widthWithPadding}
          height={heightWithPadding}
        ></WagmiChart>
      ) : (
        <LineValueChart
          data={data}
          width={widthWithPadding}
          height={heightWithPadding}
        ></LineValueChart>
      )}
    </Container>
  );
}

export default memo(HomeChart);
