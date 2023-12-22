import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Form from "../Form";
import { IFormData, Message } from "../../types";

describe("Page", () => {
  it("renders a form component", () => {
    const formData: IFormData = {
      firstName: "",
      lastName: "",
      email: "",
      date: "",
    };

    const message: Message = {
      type: "",
      text: "",
    };

    const { container } = render(
      <Form formData={formData} message={message} handleSubmit={() => {}} handleSetFormData={() => {}} />
    );

    const firstNameInput = container.querySelector(`input[name="firstName"]`);
    expect(firstNameInput).toBeInTheDocument();
  });
});
