import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

// dayjs.extend(utc);

function convertUTCToLocal(utcString: string) {
  const localDate = dayjs(utcString).local(); // Convert to local time zone

  return localDate.format("YYYY-MM-DDTHH:mm:ss.SSSZ");
}

export default convertUTCToLocal;

export const formatToLocalMonthDay = (utcString: string) => {
  const date = new Date(utcString);

  // 로컬 시간대로 날짜 정보 얻기
  const day = date.getDate();
  const month = date.getMonth() + 1;

  return `${month}월 ${day}일`;
};
