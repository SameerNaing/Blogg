import formatDate from "./formatDate";

it("should return formatted date", () => {
  const d = new Date("2021-03-14");
  expect(formatDate(d)).toBe("14, Mar, 2021");
});
