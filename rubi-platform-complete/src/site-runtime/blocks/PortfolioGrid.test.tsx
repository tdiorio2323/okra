import { render, screen } from "@testing-library/react";
import PortfolioGrid from "./PortfolioGrid";

test("renders portfolio items", () => {
  render(<PortfolioGrid items={[{ title: "Cover Shoot", img: "/p1.jpg" }]} />);
  expect(screen.getByText("Cover Shoot")).toBeInTheDocument();
});

