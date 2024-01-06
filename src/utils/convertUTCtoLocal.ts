import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

// dayjs.extend(utc);

// Function to convert UTC string to local time
function convertUTCToLocal(utcString: string) {
  // const utcDate = dayjs.utc(utcString); // Parse the UTC string

  // const localDate = dayjs(utcString).local(); // Convert to local time zone

  // return localDate;
  return utcString;
}

export default convertUTCToLocal;
