import { Value } from "../@types/chart";
import { convertAndCreateWagmiData } from "../utils/createRestDummyData";
import useValue from "./useValue";

const useWagmiCandleStick = ({ data }: { data: Value[] }) => {
  let wagmiData: {
    timestamp: number;
    open: number;
    high: number;
    low: number;
    close: number;
  }[];

  if (data.length < 30) {
    wagmiData = convertAndCreateWagmiData(data, 30 - data.length);
  } else {
    wagmiData = convertAndCreateWagmiData(data, 0);
  }

  return {
    data: wagmiData,
  };
};

export default useWagmiCandleStick;
