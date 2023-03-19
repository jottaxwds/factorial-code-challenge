import { render, screen } from "@testing-library/react";
import Average from "../Average";

describe("Average", () => {
  it("Should a Title and CircularProgress by given average data", () => {
    render(<Average title="Average Title" value={90} displayValue={"900"} />);
    expect(screen.getByTestId("average")).toMatchSnapshot();
  });
});
