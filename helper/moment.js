import moment from "moment";
import "moment/locale/vi";

moment.locale("vi");

export const convertToFullDateTime = (date) => {
  return moment(date).format("HH:mm DD-MM-YYYY");
};

export const convertToTime = (date) => {
  return moment(date).format("H:m");
};

export const convertToDate = (date) => {
  return moment(date).format("D/M/YYYY");
};
