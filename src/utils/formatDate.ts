const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** Returns formatted date eg. 2, Sep, 2021 */
function formatDate(date: Date): string {
  const d = new Date(date);
  return `${d.getDate()}, ${MONTHS[d.getMonth()]}, ${d.getFullYear()}`;
}

export default formatDate;
