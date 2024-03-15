import mobileAds, { MaxAdContentRating } from "react-native-google-mobile-ads";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";

const configureAdMob = async () => {
  await mobileAds().setRequestConfiguration({
    // Update all future requests suitable for parental guidance
    maxAdContentRating: MaxAdContentRating.PG,

    // Indicates that you want the ad request to be handled in a
    // manner suitable for users under the age of consent.
    tagForUnderAgeOfConsent: true,

    // An array of test device IDs to allow.
    testDeviceIdentifiers: ["EMULATOR"],
  });
};

export const initializeAdMob = async () => {
  const result = await check(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
  if (result === RESULTS.DENIED) {
    console.log("The permission has not been requested, so request it.");
    // The permission has not been requested, so request it.
    await request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
  }
  console.log("결과=====", result);

  //   await configureAdMob();
  const adapterStatuses = await mobileAds()
    .initialize()
    .then((adapterStatuses) => {
      console.log("Initialization complete!", adapterStatuses);
    });
  return adapterStatuses;
};
