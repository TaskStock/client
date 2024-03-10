import { ADMOB_ANDROID_BANNER, ADMOB_IOS_BANNER } from "@env";
import React from "react";
import { Platform } from "react-native";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

const unitID =
  Platform.select({
    ios: ADMOB_IOS_BANNER,
    android: ADMOB_ANDROID_BANNER,
  }) || "";

function BannerAds() {
  return (
    <BannerAd
      unitId={TestIds.ADAPTIVE_BANNER} // 계정 확인 후 unitID로 변경
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
    />
  );
}

export default BannerAds;
