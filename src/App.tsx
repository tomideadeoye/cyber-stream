import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import axios from "axios";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { Input } from "@/components/ui/input";

type MovieDescription = {
  "#TITLE": string;
  "#YEAR": number;
  "#IMDB_ID": string;
  "#RANK": number;
  "#ACTORS": string;
  "#AKA": string;
  "#IMDB_URL": string;
  "#IMDB_IV": string;
  "#IMG_POSTER": string;
  photo_width: number;
  photo_height: number;
};

type ApiResponse = {
  ok: boolean;
  description: MovieDescription[];
  error_code: number;
};

function App() {
  const [data, setData] = useState<MovieDescription[] | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get<ApiResponse>(
        "https://search.imdbot.workers.dev/?q="
      );
      console.log("Data:", response.data);
      if (response.data.ok) {
        setData(response.data.description);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <Counter /> */}

        <Input />

        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          {data &&
            data?.map((movie) => {
              return (
                <span
                  key={movie["#IMDB_ID"]}
                  className="text-3xl font-bold underline"
                >
                  {movie["#TITLE"]}
                </span>
              );
            })}
          <span className="text-3xl font-bold underline">Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
