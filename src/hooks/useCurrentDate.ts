import dayjs from "dayjs";
import { useAppDispatch, useAppSelect } from "../store/configureStore.hooks";
import { setCurrentDateString } from "../store/modules/calendar";
import { IsoString } from "../@types/calendar";

export const useCurrentDate = () => {
  const dispatch = useAppDispatch();

  const currentDate = dayjs(
    useAppSelect((state) => state.calendar.currentDateString)
  );

  const subtract1Month = () => {
    dispatch(
      setCurrentDateString(
        currentDate.subtract(1, "month").toISOString() as IsoString
      )
    );
  };

  const add1Month = () => {
    dispatch(
      setCurrentDateString(
        currentDate.add(1, "month").toISOString() as IsoString
      )
    );
  };

  return {
    currentDate,
    subtract1Month,
    add1Month,
  };
};
