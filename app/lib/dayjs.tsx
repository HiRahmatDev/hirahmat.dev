import dayjs from "dayjs";
import "dayjs/locale/id";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";

// Extend dayjs with plugins
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

// Set default locale to Indonesian
dayjs.locale("id");

export const formatDate = (date?: string | Date | null) => {
  if (!date) return "";
  return dayjs(date).format("DD MMM YYYY");
};

export default dayjs;
