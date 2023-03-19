import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dialog from "../Dialog";

describe("Dialog", () => {
  it("Should show given children", () => {
    const onActionHandler = jest.fn();
    render(
      <Dialog onClose={onActionHandler}>
        <div data-testid="children">Hey!</div>
      </Dialog>
    );
    const content = screen.getByTestId("children");
    expect(content).toBeInTheDocument();
  });

  it("Should show call onClose when close button is clicked", () => {
    const onCloseHandler = jest.fn();
    render(
      <Dialog onClose={onCloseHandler}>
        <div data-testid="children">Hey!</div>
      </Dialog>
    );
    const actionButton = screen.getByRole("button");
    userEvent.click(actionButton);
    expect(onCloseHandler).toHaveBeenCalledTimes(1);
  });
});
