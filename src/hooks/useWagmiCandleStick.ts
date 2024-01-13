import { convertAndCreateWagmiData } from "../utils/createRestDummyData";
import useValue from "./useValue";

const useWagmiCandleStick = () => {
  const { data, isLoading, isError, error, refetch } = useValue();

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
