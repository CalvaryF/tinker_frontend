import React, { useState, useEffect } from "react";
const endpoint = "HTTP://127.0.0.1:8000/distributions/randomnormal";
import Dash from "../components/Dash";
import { Histogram } from "../components/graphs/histogram";

export default function Home() {
  //state
  const [data, setData] = useState([0]);
  const [size, setSize] = useState(1000);
  const [bins, setBins] = useState(50);
  const [render, setRender] = useState(false);
  const [graph, setgr] = useState(50);

  //fetch data
  useEffect(() => {
    (async () => {
      if (isNaN(parseInt(size))) {
        console.log("please enter a number");
      } else if (size > 10000) {
        console.log("please enter a sample size less than 10000");
      } else {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            size: parseInt(size),
          }),
        };
        fetch(endpoint, requestOptions)
          .then((response) => response.json())
          .then((d) => {
            setData(d.randomnormal);
          });
      }
    })();
  }, [size, render]);

  //create graph
  useEffect(() => {
    setgr(
      Histogram(data, {
        height: 500,
        color: "steelblue",
        thresholds: bins,
        domain: [-5, 5],
        yDomain: [0, (size / bins) * 6],
      })
    );
  }, [data, bins]);

  //get new data
  const reRender = () => {
    setRender(!render);
  };

  return (
    <>
      <Dash
        data={data}
        graph={graph}
        controls={
          <div>
            <button onClick={reRender}>Generate</button>
            <br />
            <br />
            <input
              onChange={(e) => setSize(e.target.value)}
              type="text"
              name="name"
            />
          </div>
        }
      ></Dash>
    </>
  );
}
