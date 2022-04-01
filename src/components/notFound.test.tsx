/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
/* eslint-disable-next-line testing-library/no-node-access */
import { render } from "@testing-library/react";
import NotFound from "./NotFound";
import "@testing-library/jest-dom/extend-expect";

const { container } = render(<NotFound />);
it("className 'information' exist and have children", () => {
  expect(container.firstChild).toHaveClass("information");
  const element = container.querySelector(".information");
  expect(element).toContainHTML("Page Not Found");
});
