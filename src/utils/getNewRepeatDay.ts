export const getNewRepeatDay = (repeatDay: string, index: number) => {
  // Check the value at the desired index
  let newString;
  if (repeatDay.charAt(index) === "0") {
    newString =
      repeatDay.substring(0, index) + "1" + repeatDay.substring(index + 1);
  } else {
    newString =
      repeatDay.substring(0, index) + "0" + repeatDay.substring(index + 1);
  }

  return newString;
};
