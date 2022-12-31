export function getCorrectDateFromDMY(date: Date): Date {
  const dateString = date as unknown as string;
  const [day, month, year] = dateString.split(/[-/]/);
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}
