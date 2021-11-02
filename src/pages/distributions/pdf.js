import React, { useState, useEffect } from "react";
const endpoint = "HTTP://127.0.0.1:8000/distributions/pdf";
import Dash from "../../components/Dash";
import { Scatterplot } from "../../components/graphs/scatterplot";

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
  const [size, setSize] = useState(500);
  const [cov, setCov] = useState(0.9);
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
            cov: parseFloat(cov),
          }),
        };
        fetch(endpoint, requestOptions)
          .then((response) => response.json())
          .then((d) => {
            setData(d.pdf);
          });
      }
    })();
  }, [size, render]);

  //create graph
  useEffect(() => {
    setgr(
      Scatterplot(data, {
        x: (d) => d[0],
        y: (d) => d[1],
        height: width / 2.5,
        width: width / 2,
        color: "steelblue",
        xDomain: [-5, 5],
        yDomain: [0, 120],
        fill: "steelblue",
        stroke: "none",
        r: 5,
      })
    );
  }, [data, bins, width]);

  //get new data
  const reRender = () => {
    console.log(data);
    setRender(!render);
  };

  return (
    <>
      <Dash
        title="Correlation"
        data={data}
        columns={[0, 0]}
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
