import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RT } from "./configureStore";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelect: TypedUseSelectorHook<RT> = useSelector;
