import { ADMOB_ANDROID_BANNER, ADMOB_IOS_BANNER } from "@env";
import React from "react";
import { Platform, View } from "react-native";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";
import useHeight from "../../hooks/useHeight";

const unitID =
  Platform.select({
    ios: ADMOB_IOS_BANNER,
    android: ADMOB_ANDROID_BANNER,
  }) || "";

function BannerAds() {
  const { NOTCH_BOTTOM } = useHeight();
  return (
    <View style={{ paddingBottom: NOTCH_BOTTOM }}>
      <BannerAd
        unitId={unitID} // 테스트할 때 TestIDs로 변경
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />
    </View>
  );
}

export default BannerAds;
