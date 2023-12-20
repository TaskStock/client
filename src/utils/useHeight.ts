import { useSafeAreaInsets } from "react-native-safe-area-context";

const useHeight = () => {
  const insets = useSafeAreaInsets();
  const NOTCH_TOP = insets.top;
  const NOTCH_BOTTOM = insets.bottom;

  return {
    NOTCH_TOP,
    NOTCH_BOTTOM,
  };
};

export default useHeight;
