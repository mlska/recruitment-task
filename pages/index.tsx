import Prisma from "@prisma/client";
import React, { useRef, useState } from "react";
import { Error } from "../types";

interface classMap {
  [name: string]: string;
}

const classes: classMap = {
  red: "text-red-600",
  green: "text-green-600",
};

export default function Home() {
  const spanRef = useRef<HTMLSpanElement>(null);

  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [events, setEvents] = useState<Prisma.Event[]>([]);
  const [visible, setVisible] = useState<boolean>(false);

  const handleSetFname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFname(event.target.value);
  };

  const handleSetLname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLname(event.target.value);
  };

  const handleSetEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSetDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setDate(event.target.value);
  };

  const clearInputs = (): void => {
    setFname("");
    setLname("");
    setEmail("");
    setDate("");
  };

  async function getEvents(url: string) {
    const response = await fetch(url, {
      method: "GET",
    });
    if (response.status === 200) {
      return response.json();
    } else {
      return response;
    }
  }

  const handleOnGetEvents = (): void => {
    getEvents("api/events").then((data) => {
      setEvents(data);
      setVisible((prevState) => !prevState);
    });
  };

  const EventsComponent = () => {
    const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (event.currentTarget.parentElement !== null) {
        const id = event.currentTarget.parentElement.getAttribute("data-key");
        deleteEvent("api/events", id).then((data) => {
          getEvents("api/events").then((data) => {
            setEvents(data);
          });
        });
      }
    };

    const deleteEvent = async (url: string, id: string | null) => {
      if (id === null) {
        console.log("error id is null");
        return;
      }
      const response = await fetch(url, {
        method: "DELETE",
        credentials: "same-origin",
        body: JSON.stringify(id),
      });
      if (response.status === 200) {
        return response.json();
      }
    };

    const eventList = events.map((event, index) => {
      const { id, fname, lname, email } = event;
      const date = new Date(event.date)
        .toLocaleString("en-GB")
        .substring(0, 10);
      return (
        <li className="flex justify-between my-2" key={index} data-key={id}>
          <span className="mr-4 ">{`${
            index + 1
          }. ${fname} ${lname}, ${email}, ${date}`}</span>
          <button
            onClick={handleDelete}
            className="px-2 text-white bg-red-500 border-2 border-black "
          >
            X
          </button>
        </li>
      );
    });
    return <ul>{eventList}</ul>;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let record: Omit<Prisma.Event, "id"> = {
      fname,
      lname,
      email,
      date: new Date(date),
    };

    const setMessage = (message: string) => {
      if (spanRef.current !== null) {
        spanRef.current.innerText = message;
      }
    };

    const setSpanColor = (color: string) => {
      const ref = spanRef.current;
      if (ref !== null) {
        switch (color) {
          case classes.red:
            ref.classList.remove(classes.green);
            ref.classList.add(classes.red);
            break;
          case classes.green:
            ref.classList.add(classes.green);
            ref.classList.remove(classes.red);
            break;
          default:
            break;
        }
      }
    };

    async function postEvent(url: string, data: Omit<Prisma.Event, "id">) {
      const response = await fetch(url, {
        method: "PUT",
        credentials: "same-origin",
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        return response.json();
      }
    }

    postEvent("api/events", record)
      .then((data) => {
        setMessage("Data inserted correctly");
        setSpanColor(classes.green);
        clearInputs();
      })
      .catch((error) => {
        setMessage(Error.connection);
        setSpanColor(classes.red);
      });

    // fetch("api/events", {
    //   method: "GET",
    // })
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //   });

    // fetch("api/hello")
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //   });
  };

  return (
    <section className="h-screen font-inter">
      <div className="container h-full px-6 py-12 mx-auto">
        <div className="flex flex-wrap items-center justify-center h-full text-gray-800 g-6">
          <div className="md:w-8/12 lg:w-5/12">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <input
                  type="text"
                  className="block w-full px-4 py-2 m-0 text-xl font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="First name"
                  value={fname}
                  onChange={handleSetFname}
                />
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  className="block w-full px-4 py-2 m-0 text-xl font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Last name"
                  value={lname}
                  onChange={handleSetLname}
                />
              </div>
              <div className="mb-6">
                <input
                  type="email"
                  className="block w-full px-4 py-2 m-0 text-xl font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Email address"
                  value={email}
                  onChange={handleSetEmail}
                />
              </div>
              <div className="mb-6">
                <input
                  type="date"
                  className="block w-full px-4 py-2 m-0 text-xl font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Event date"
                  value={date}
                  onChange={handleSetDate}
                />
              </div>
              <div className="mb-6">
                <span ref={spanRef} className="px-4 text-red-600"></span>
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
            <button
              onClick={handleOnGetEvents}
              className="inline-block w-full py-3 my-4 text-sm font-medium leading-snug text-white uppercase transition duration-150 ease-in-out bg-yellow-600 rounded shadow-md px-7 hover:bg-yellow-700 hover:shadow-lg focus:bg-yellow-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-800 active:shadow-lg"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
            >
              {visible ? `Hide` : `Show events`}
            </button>
            {visible && <EventsComponent />}
          </div>
        </div>
      </div>
    </section>
  );
}
