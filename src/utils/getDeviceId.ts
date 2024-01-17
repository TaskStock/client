import DeviceInfo from "react-native-device-info";

const getDeviceId = async () => {
  const deviceId = await DeviceInfo.getUniqueId();
  return deviceId;
};

export default getDeviceId;
