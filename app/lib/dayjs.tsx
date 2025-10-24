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
  return dayjs(date).format("D MMMM YYYY");
};

export const formatDateTime = (date?: string | Date | null) => {
  if (!date) return "";
  return `${dayjs(date).format("D MMM YYYY")}\u2002${dayjs(date).format(
    "HH:mm"
  )}`;
};

export const formatPublishedDate = (date?: string | Date | null) => {
  if (!date) return "";
  return `Dipublikasikan pada ${formatDate(date)}`;
};

export default dayjs;
