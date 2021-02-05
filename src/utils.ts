import { allowedTerms } from "./constants";

export function cleanAndValidate(string: string): string {
  const parsedString = string.trim().toUpperCase();
  if (parsedString && allowedTerms.includes(parsedString)) {
    return parsedString;
  } else {
    return "";
  }
}

interface ParsedDate {
  day: string;
  month: string;
  hours: string;
  minutes: string;
}

export function parseDate(stringDate: string): ParsedDate {
  let result = { day: "", month: "", hours: "", minutes: "" };
  const format = (num: number): string => num.toString().padStart(2, "0");
  const date = new Date(stringDate);
  result.day = format(date.getDate());
  result.month = format(date.getMonth() + 1);
  result.hours = format(date.getHours());
  result.minutes = format(date.getMinutes());
  return result;
}
