import { View } from "react-native";
import { BaseToast, ErrorToast } from "react-native-toast-message";
import Text from "../components/atoms/Text";
import { palette } from "../constants/colors";

export const toastConfig = {
  /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
  success: ({
    text1,
    props,
  }: {
    text1?: string;
    props: {
      uuid: string;
    };
  }) => (
    <View
      style={{
        height: 60,
        width: "90%",
        backgroundColor: palette.neutral700_dark,
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {text1 && (
        <Text size="md" color={palette.neutral100_gray} weight="medium">
          {text1}
        </Text>
      )}
    </View>
  ),
  /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
  error: ({
    text1,
    props,
  }: {
    text1?: string;
    props: {
      uuid: string;
    };
  }) => (
    <View
      style={{
        height: 60,
        width: "90%",
        backgroundColor: palette.neutral700_dark,
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {text1 && (
        <Text size="md" color={palette.neutral100_gray} weight="medium">
          ⚠️ {text1}
        </Text>
      )}
    </View>
  ),
  /*
      Or create a completely new type - `tomatoToast`,
      building the layout from scratch.
  
      I can consume any custom `props` I want.
      They will be passed when calling the `show` method (see below)
    */
};
