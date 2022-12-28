import { useRef } from "react";
import { ValidationError } from "../types";
import getEvents from "./api/events";

export default function Home() {
  const spanRef = useRef<HTMLSpanElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submitted");
    if (spanRef.current !== null) {
      spanRef.current.innerText = ValidationError.firstName;
    }

    async function getRecipes(url: string) {
      const response = await fetch(url);
      return response.json();
    }

    getRecipes("api/events").then((data) => {
      if (data.status === "200") {
        console.log(data.events);
      }
    });
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
                />
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  className="block w-full px-4 py-2 m-0 text-xl font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Last name"
                />
              </div>
              <div className="mb-6">
                <input
                  type="email"
                  className="block w-full px-4 py-2 m-0 text-xl font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Email address"
                />
              </div>
              <div className="mb-6">
                <input
                  type="date"
                  className="block w-full px-4 py-2 m-0 text-xl font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Event date"
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
          </div>
        </div>
      </div>
    </section>
  );
}
