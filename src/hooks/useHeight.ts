import { useSafeAreaInsets } from "react-native-safe-area-context";

const useHeight = () => {
  const insets = useSafeAreaInsets();
  const NOTCH_TOP = insets.top;
  const NOTCH_BOTTOM = insets.bottom;
  const BOTTOM_TAB = NOTCH_BOTTOM + 60;

  return {
    NOTCH_TOP,
    NOTCH_BOTTOM,
    BOTTOM_TAB,
  };
};

export default useHeight;
