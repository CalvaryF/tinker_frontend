import React, { useState, useEffect } from "react";
const endpoint = "HTTP://127.0.0.1:8000/distributions/normal";
import Dash from "../../components/Dash";
import { Histogram } from "../../components/graphs/histogram";

export default function Home() {
  var w;
  var h;
  if (typeof window !== "undefined") {
    w = window.innerWidth;
    h = window.innerHeight;
  }
  const updateWidthAndHeight = () => {
    setWidth(window.innerWidth);
    console.log(width);
  };
  useEffect(() => {
    window.addEventListener("resize", updateWidthAndHeight);
    return () => window.removeEventListener("resize", updateWidthAndHeight);
  });
  //state
  const [width, setWidth] = useState(w);
  const [data, setData] = useState([0]);
  const [size, setSize] = useState(1000);
  const [skew, setSkew] = useState(0);
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
            skew: parseInt(skew),
          }),
        };
        fetch(endpoint, requestOptions)
          .then((response) => response.json())
          .then((d) => {
            setData(d.normal);
          });
      }
    })();
  }, [size, render, skew]);

  //create graph
  useEffect(() => {
    setgr(
      Histogram(data, {
        height: width / 2.5,
        width: width / 2,
        color: "steelblue",
        thresholds: bins,
        domain: [-5, 5],
        yDomain: [0, (size / bins) * 6],
      }).node()
    );
  }, [data, bins, width]);

  //get new data
  const reRender = () => {
    setRender(!render);
  };

  return (
    <>
      <Dash
        title="Normal Distribution"
        data={data}
        columns={[0]}
        graph={graph}
        controls={
          <div>
            <button onClick={reRender}>Generate</button>
            <br />
            <br />
            <div>Sample Size</div>
            <br />
            <input
              onChange={(e) => setSize(e.target.value)}
              type="text"
              name="name"
            />
            <br /> <br />
            <div>Skew</div>
            <br />
            <input
              onChange={(e) => setSkew(e.target.value)}
              type="text"
              name="name"
            />
          </div>
        }
      ></Dash>
    </>
  );
}
