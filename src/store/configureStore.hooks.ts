import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, TRootState } from "./configureStore";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelect: TypedUseSelectorHook<TRootState> = useSelector;
