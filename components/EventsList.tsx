import React, { useState } from "react";
import Prisma from "@prisma/client";

interface EventsListProps {
  events: Prisma.Event[];
  deleteEvent: (id: string) => void;
  getEvents: () => void;
}

export default function EventsList({ events, deleteEvent, getEvents }: EventsListProps) {
  const [visible, setVisible] = useState<boolean>(false);

  const formatDate = (date: Date) => new Date(date).toLocaleString("en-GB").substring(0, 10);

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.parentElement?.getAttribute("data-key");
    id && deleteEvent(id);
  };

  const handleShowHideEvents = () => {
    !visible && getEvents();
    setVisible((prevState) => !prevState);
  };

  const list = events?.map((event, index) => {
    const { id, fname, lname, email, date } = event;
    return (
      <li
        className="flex items-center justify-between p-2 mt-4 border-2 border-solid border-sky-500"
        key={index}
        data-key={id}
      >
        <span className="mr-4">{`${index + 1}. ${fname} ${lname}, ${email}, ${formatDate(date)}`}</span>
        <button onClick={handleDelete} className="px-2 text-white align-middle bg-red-500 border-2 border-black h-1/2">
          X
        </button>
      </li>
    );
  });

  return (
    <div className="w-full" data-testid="eventsListContainer">
      <button
        onClick={handleShowHideEvents}
        className="inline-block w-full py-3 my-4 text-sm font-medium leading-snug text-white uppercase transition duration-150 ease-in-out bg-yellow-600 rounded shadow-md px-7 hover:bg-yellow-700 hover:shadow-lg focus:bg-yellow-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-800 active:shadow-lg"
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
      >
        {visible ? `Hide` : `Show events`}
      </button>
      <ul>{visible && list}</ul>
    </div>
  );
}
