import theme from "./theme";

const config = [
  {
    colName: "name",
    colLabel: "NAME",
    isSortable: true,
  },
  {
    colName: "date",
    colLabel: "DATE",
    isSortable: true,
  },
  {
    colName: "value",
    colLabel: "VALUE",
    isSortable: true,
    conditionalColor: (value: number) => {
      if (value < 300) {
        return theme.palette.green;
      }
      if (value >= 300 && value <= 700) {
        return theme.palette.orange;
      }
      return theme.palette.red;
    },
  },
];
export { config };
