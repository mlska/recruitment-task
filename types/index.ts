import Prisma from "@prisma/client";

export enum Error {
  missingFormData = "Missing form data",
  dataNotInserted = 'Error inserting event"',
}

export enum Information {
  dataInserted = "Data inserted correctly",
}

export interface IFormData {
  firstName: string;
  lastName: string;
  email: string;
  date: string;
}

export type Message = {
  type: "Error" | "Information" | "Warning" | "";
  text: string;
};
