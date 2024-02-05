import React, { memo, useState } from "react";
import { Pressable } from "react-native";
import styled from "styled-components/native";
import FlexBox from "../../atoms/FlexBox";
import LoadingSpinner from "../../atoms/LoadingSpinner";
import Text from "../../atoms/Text";
import LineValueChart from "../../molecules/LineValueChart";
import CenterLayout from "../../atoms/CenterLayout";
import WagmiChart from "../../molecules/WagmiChart";
import useWagmiCandleStick from "../../../hooks/useWagmiCandleStick";
import { Value } from "../../../@types/chart";

const Container = styled.View`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
`;

function HomeChart({
  isCandleStick,
  value: { data, isLoading, isError, error, refetch },
}: {
  isCandleStick: boolean;
  value: {
    data: Value[] | undefined;
    isLoading: boolean;
    isError: boolean;
    error: any;
    refetch: () => void;
  };
}) {
  const [containerSize, setContainerSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

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

  return (
    <Container
      onLayout={(event) => {
        const { width, height } = event.nativeEvent.layout;

        if (containerSize?.width === width && containerSize?.height === height)
          return;

        setContainerSize({
          width,
          height,
        });
      }}
    >
      {containerSize &&
        (isCandleStick ? (
          <WagmiChart data={wagmiData}></WagmiChart>
        ) : (
          <LineValueChart
            height={containerSize.height}
            width={containerSize.width}
            data={data}
          ></LineValueChart>
        ))}
    </Container>
  );
}

export default memo(HomeChart);
