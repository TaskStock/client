export const getNewRepeatDay = (
  repeatDay: string | null,
  index: number
): string => {
  if (!repeatDay) {
    return "0000000";
  }

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
