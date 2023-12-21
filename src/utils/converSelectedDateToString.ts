import { DateRage } from "@/interfaces";

const converSelectedDateToString = (range: DateRage) => {
  const dateString =
    (range.startDate?.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
    }) || "") +
    (range.endDate
      ? " - " +
        range.endDate?.toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
        })
      : "");
  return dateString;
};

export default converSelectedDateToString;
