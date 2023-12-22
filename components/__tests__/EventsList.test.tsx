import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import EventsList from "../EventsList";
import { IFormData, Message } from "../../types";

describe("Page", () => {
  it("renders a events list  component", () => {
    render(<EventsList events={[]} deleteEvent={() => {}} getEvents={() => {}} />);

    const container = screen.getByTestId("eventsListContainer");
    expect(container).toBeInTheDocument();
  });
});
