import { useEffect } from "react";
import { useAppDispatch, useAppSelect } from "../store/configureStore.hooks";
import { useGetValuesArg } from "./useGetValuesArg";
import { chartApi } from "../store/modules/chart";
import { checkIsWithInCurrentCalcDay } from "../utils/checkIsSameLocalDay";
import { resetSaveValueUpdate } from "../store/modules/home";

export const useFlushSavedValues = () => {
  const isHomeDrawerOpen = useAppSelect((state) => state.home.isDrawerOpen);
  const { startDate, endDate } = useGetValuesArg();
  const savedValueUpdate = useAppSelect((state) => state.home.savedValueUpdate);
  const dispatch = useAppDispatch();

  // flush savedValueUpdate
  useEffect(() => {
    if (!isHomeDrawerOpen) {
      console.log("flush savedValueUpdate");

      dispatch(
        chartApi.util.updateQueryData(
          "getValues",
          {
            startDate,
            endDate,
          },
          (draft) => {
            if (!draft) return;

            const values = draft.values;

            if (values.length == 0) return;

            const index = values.findIndex((value) =>
              checkIsWithInCurrentCalcDay(value.date)
            );

            if (index == -1) return;

            const targetValue = values[index];

            targetValue.high += savedValueUpdate.dhigh;
            targetValue.low += savedValueUpdate.dlow;
            targetValue.start += savedValueUpdate.dstart;
            targetValue.end += savedValueUpdate.dend;

            dispatch(resetSaveValueUpdate());
          }
        )
      );
    }
  }, [isHomeDrawerOpen]);
};
