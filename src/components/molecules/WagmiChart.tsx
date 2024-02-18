import * as React from "react";
import { useTheme } from "styled-components/native";
import {
  CandlestickChartCandles,
  CandlestickChartCrosshair,
  CandlestickChartCrosshairTooltip,
  CandlestickChartProvider,
} from "../organisms/WagmiChart/candle";
import { CandlestickChart } from "../organisms/WagmiChart/candle/Chart";
import { WagmiData } from "../../@types/chart";
import WagmiTooltips from "../organisms/WagmiChart/candle/WagmiCustomTooltips";
import { WagmiCustomTooltipItem } from "../organisms/WagmiChart/candle/WagmiCustomTooltipItem";
import Text from "../atoms/Text";

function WagmiChart({
  data,
  width,
  height,
}: {
  data: WagmiData[];
  width: number;
  height: number;
}) {
  const theme = useTheme();

  return (
    <>
      <CandlestickChartProvider data={data}>
        <CandlestickChart width={width} height={height}>
          <CandlestickChartCandles
            useAnimations={true}
            positiveColor={theme.high}
            negativeColor={theme.low}
            lineColor={theme.palette.neutral600_gray}
          />
          {/* <WagmiTooltips>
            <WagmiCustomTooltipItem>
              <Text size="md">dfdf</Text>
            </WagmiCustomTooltipItem>
          </WagmiTooltips> */}
          {/* <CandlestickChartCrosshair>
            <CandlestickChartCrosshairTooltip
              textStyle={{
                color: theme.text,
              }}
            />
          </CandlestickChartCrosshair> */}
        </CandlestickChart>
      </CandlestickChartProvider>
    </>
  );
}

export default React.memo(WagmiChart);
