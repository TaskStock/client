import * as React from "react";
import { useTheme } from "styled-components/native";
import {
  CandlestickChartCandles,
  CandlestickChartCrosshair,
  CandlestickChartCrosshairTooltip,
  CandlestickChartProvider,
} from "../organisms/WagmiChart/candle";
import { CandlestickChart } from "../organisms/WagmiChart/candle/Chart";
import { sizeContext } from "../organisms/GraphWithUserInfo";
import { WagmiData } from "../../@types/chart";

function WagmiChart({ data }: { data: WagmiData[] }) {
  const theme = useTheme();

  console.log("wagon chart data rerendered");

  const { width: contextWidth, height: contextHeight } =
    React.useContext(sizeContext);

  return (
    <>
      <CandlestickChartProvider data={data}>
        <CandlestickChart width={contextWidth} height={contextHeight}>
          <CandlestickChartCandles
            useAnimations={true}
            positiveColor={theme.palette.red}
            negativeColor={theme.palette.blue}
            lineColor={theme.palette.neutral600_gray}
          />
          <CandlestickChartCrosshair>
            <CandlestickChartCrosshairTooltip
              textStyle={{
                color: theme.text,
              }}
            />
          </CandlestickChartCrosshair>
        </CandlestickChart>
      </CandlestickChartProvider>
    </>
  );
}

export default React.memo(WagmiChart);
