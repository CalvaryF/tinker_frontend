import React, { useState, useEffect } from "react";
const endpoint = "HTTP://127.0.0.1:8000/correlation/randomcorrelation";
import Dash from "../../components/Dash";
import { Spline } from "../../components/graphs/spline";

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

  //create graph
  useEffect(() => {
    setgr(
      Spline(
        [
          [100, 100],
          [250, 300],
          [120, 320],
          [500, 70],
        ],
        600,
        400,
        "curveBasis"
      ).node()
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
