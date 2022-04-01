import { render, fireEvent } from "@testing-library/react";
import GuestPage from "./GuestPage";

// let container: HTMLDivElement;
// beforeEach(() => {
//   container = document.createElement("div");
//   document.body.appendChild(container);
// });

// afterEach(() => {
//   unmountComponentAtNode(container);
//   container.remove();
// });

const { container } = render(<GuestPage />);

it("renders GuestPage", () => {
  expect(container).toBeVisible();
  // expect(container).
});
