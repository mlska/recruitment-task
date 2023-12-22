import Prisma from "@prisma/client";
import React, { useEffect, useRef, useState } from "react";
import { Error, Information, IFormData, Message } from "../types";
import EventsList from "../components/EventsList";
import Form from "../components/Form";

export default function Home() {
  const API_URL = "api/events";

  const initialFromData: IFormData = {
    firstName: "",
    lastName: "",
    email: "",
    date: "",
  };

  const initialMessageData: Message = {
    type: "",
    text: "",
  };

  const [formData, setFormData] = useState<IFormData>(initialFromData);
  const [message, setMessage] = useState<Message>(initialMessageData);
  const [events, setEvents] = useState<Prisma.Event[]>([]);

  const handleSetFormData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOnGetEvents = async () => {
    const events = await getEvents();
    setEvents(events);
  };

  const handleDelete = async (id: string) => {
    const deleted = await deleteEvent(id);
    const events = await getEvents();
    setEvents(events);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { firstName, lastName, email, date } = formData;

    if (!firstName || !lastName || !email || !date) {
      handleSetMessage({
        type: "Error",
        text: Error.missingFormData,
      });
      return;
    }

    const eventToPost: Omit<Prisma.Event, "id"> = {
      fname: firstName,
      lname: lastName,
      email,
      date: new Date(date),
    };

    const response = await postEvent(eventToPost);
    if (!response) {
      handleSetMessage({
        type: "Error",
        text: Error.dataNotInserted,
      });
      return;
    }

    handleSetMessage({
      type: "Information",
      text: Information.dataInserted,
    });

    handleOnGetEvents();
    clearInputs();
  };

  const handleSetMessage = (message: Message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(initialMessageData);
    }, 5000);
  };

  const getEvents = async () => {
    const response = await fetch(API_URL, {
      method: "GET",
    });
    if (response.status === 200) {
      return response.json();
    }
  };

  const postEvent = async (data: Omit<Prisma.Event, "id">) => {
    const response = await fetch(API_URL, {
      method: "PUT",
      credentials: "same-origin",
      body: JSON.stringify(data),
    });
    if (response.status === 200) {
      return response.json();
    }
  };

  const deleteEvent = async (id: string) => {
    const response = await fetch(API_URL, {
      method: "DELETE",
      credentials: "same-origin",
      body: JSON.stringify(id),
    });
    if (response.status === 200) {
      return response.json();
    }
  };

  const clearInputs = (): void => {
    setFormData(initialFromData);
  };

  return (
    <section className="h-screen font-inter">
      <div className="container flex flex-col flex-wrap items-center justify-center h-full px-6 py-12 mx-auto text-gray-800 md:w-8/12 lg:w-5/12">
        <Form formData={formData} handleSetFormData={handleSetFormData} message={message} handleSubmit={handleSubmit} />
        <EventsList events={events} deleteEvent={handleDelete} getEvents={handleOnGetEvents} />
      </div>
    </section>
  );
}
