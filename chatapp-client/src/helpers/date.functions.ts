import moment from "moment";
import "moment/dist/locale/es";

export const hourMonth = (dateStr: string): string => {
  moment.locale("es");
  const todayMonth = moment(dateStr);

  return todayMonth.format("MMMM D YYYY, h:mm a");
};
