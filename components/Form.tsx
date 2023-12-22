import React from "react";
import { IFormData, Message } from "../types";

interface FormProps {
  message: Message;
  formData: IFormData;
  handleSetFormData: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function Form(props: FormProps) {
  const { formData, handleSubmit, handleSetFormData, message } = props;

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <input
            data-testid="firstNameInput"
            type="text"
            className="block w-full px-4 py-2 m-0 text-xl font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="First name"
            name="firstName"
            value={formData.firstName}
            onChange={handleSetFormData}
          />
        </div>
        <div className="mb-6">
          <input
            type="text"
            className="block w-full px-4 py-2 m-0 text-xl font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Last name"
            name="lastName"
            value={formData.lastName}
            onChange={handleSetFormData}
          />
        </div>
        <div className="mb-6">
          <input
            type="email"
            className="block w-full px-4 py-2 m-0 text-xl font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Email address"
            name="email"
            value={formData.email}
            onChange={handleSetFormData}
          />
        </div>
        <div className="mb-6">
          <input
            type="date"
            className="block w-full px-4 py-2 m-0 text-xl font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Event date"
            name="date"
            value={formData.date}
            onChange={handleSetFormData}
          />
        </div>
        <div className="mb-6">
          <span className={`px-4 font-bold ${message.type === "Error" ? "text-red-600" : "text-green-600"}`}>
            {message.text}
          </span>
        </div>
        <button
          type="submit"
          className="inline-block w-full py-3 text-sm font-medium leading-snug text-white uppercase transition duration-150 ease-in-out bg-blue-600 rounded shadow-md px-7 hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
