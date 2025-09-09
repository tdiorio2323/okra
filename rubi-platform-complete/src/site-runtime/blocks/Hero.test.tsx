import { render, screen } from "@testing-library/react";
import Hero from "./Hero";

test("shows title and subtitle", () => {
  render(<Hero title="Willow Ryder" subtitle="Actress" />);
  expect(screen.getByText("Willow Ryder")).toBeInTheDocument();
  expect(screen.getByText("Actress")).toBeInTheDocument();
});

