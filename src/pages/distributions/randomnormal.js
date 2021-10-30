import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Histogram } from "../../components/graphs/histogram";
import d3, { arc, pie, scaleBand, scaleLinear, max, select } from "d3";

export default function Home({ data, done }) {
  const [normal, setNormal] = useState([0]);
  const [size, setSize] = useState(1000);
  const [bins, setBins] = useState(50);
  const [render, setRender] = useState(false);

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
        fetch(
          "HTTP://127.0.0.1:8000/distributions/randomnormal",
          requestOptions
        )
          .then((response) => response.json())
          .then((data) => {
            setNormal(data.randomnormal);
          });
      }
    })();
  }, [size, render]);

  useEffect(() => {
    setNormal([1]);
  }, []);

  const containerRef = useRef(null);

  useLayoutEffect(() => {
    //get ref
    const div = select(containerRef.current);
    //create some shit
    const sv = Histogram(normal, {
      height: 500,
      color: "steelblue",
      thresholds: bins,
      domain: [-5, 5],
      yDomain: [0, (size / bins) * 6],
    });

    //append the shit to the ref
    div
      .selectAll("span")
      .data([1])
      .join(
        (enter) => enter.append("span"),
        (update) => update.append("span").append(() => sv),
        (exit) => exit.remove()
      );
  }, [normal, bins]);

  //generate normal data
  const reRender = () => {
    setRender(!render);
  };
  return (
    <>
      <div ref={containerRef}></div>
      <h1>Gaussian Samples</h1>
      <button onClick={reRender}>Generate</button>
      <br />
      <br />
      <input
        onChange={(e) => setSize(e.target.value)}
        type="text"
        name="name"
      />

      <br />
      <br />
      {normal.map((i, key) => (
        <div key={key} className="user">
          {i}
        </div>
      ))}
    </>
  );
}
