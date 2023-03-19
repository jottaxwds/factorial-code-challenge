import dayjs from "dayjs";
import { DEFAULT_DATE_FORMAT } from "../../../constants";
import { SortType } from "../types";
import { sortItems } from "../utils";
import { data } from "./../../../testData";

describe("List utils", () => {
  const dataSet = data.metrics
    .map((item, index) => ({
      ...item,
      date: dayjs(`03/${index + 1}/2023 2:34 AM`).format(DEFAULT_DATE_FORMAT),
    }))
    .slice(0, 5);
  it("Should sort items by field that is a valid string date in ASC order", () => {
    const sortedData = sortItems(dataSet, "date", SortType.ASC);
    const expectedSortedDates = [
      "03/05/2023 2:34 AM",
      "03/04/2023 2:34 AM",
      "03/03/2023 2:34 AM",
      "03/02/2023 2:34 AM",
      "03/01/2023 2:34 AM",
    ];
    const sortedDates = sortedData.map(([_, { date }]) => date);
    const rightSorted =
      JSON.stringify(expectedSortedDates) === JSON.stringify(sortedDates);
    expect(rightSorted).toBeTruthy();
  });

  it("Should sort items by string field values in ASC order", () => {
    const sortedData = sortItems(dataSet, "name", SortType.ASC);
    const sortedFields = sortedData.map(([_, { name }]) => name);
    const expectedSortedFields = ["CORE1", "CORE1", "CORE2", "CORE3", "CORE5"];
    const rightSorted =
      JSON.stringify(sortedFields) === JSON.stringify(expectedSortedFields);
    expect(rightSorted).toBeTruthy();
  });

  it("Should sort items by string field values in DESC order", () => {
    const sortedData = sortItems(dataSet, "value", SortType.DESC);
    const sortedFields = sortedData.map(([_, { value }]) => value);
    const expectedSortedFields = ["475", "668", "708", "747", "870"];
    const rightSorted =
      JSON.stringify(sortedFields) === JSON.stringify(expectedSortedFields);
    expect(rightSorted).toBeTruthy();
  });
});
