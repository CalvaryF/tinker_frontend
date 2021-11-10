import React, { useState, useEffect } from "react";
const endpoint = "HTTP://127.0.0.1:8000/correlation/randomcorrelation";
import Dash from "../../components/Dash2";
import { Bezier } from "../../components/graphs/bezier";

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
  const [bins, setBins] = useState(50);
  const [render, setRender] = useState(false);
  const [graph, setgr] = useState(50);

  //create graph
  useEffect(() => {
    setgr(
      Bezier(
        width / 3.33333,
        width / 3.33333,
        0,
        0.7,
        0.55,
        0.28,
        0.25,
        0,
        1,
        0.5
      ).node()
    );
  }, [bins, width]);

  return (
    <>
      <Dash
        title="Correlation"
        data={data}
        columns={[0, 0]}
        graph={graph}
        controls={
          <div>
            <button>Generate</button>
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
