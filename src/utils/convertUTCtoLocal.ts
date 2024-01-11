import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

// dayjs.extend(utc);

function convertUTCToLocal(utcString: string) {
  const localDate = dayjs(utcString).local(); // Convert to local time zone

  return localDate.format("YYYY-MM-DDTHH:mm:ss.SSSZ");
}

export default convertUTCToLocal;
