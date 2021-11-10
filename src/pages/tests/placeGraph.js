import React, { useState, useEffect, useRef } from "react";
const endpoint = "HTTP://127.0.0.1:8000/correlation/randomcorrelation";
import styled from "styled-components";
import Dash from "../../components/Dash2";
import { Scatterplot } from "../../components/graphs/scatterplot2";
import * as d3 from "d3";
import Graph from "../../components/Graph2";

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
  const [data, setData] = useState([
    [0, 0],
    [-3, -3],
  ]);
  const [size, setSize] = useState(500);
  const [cov, setCov] = useState(0.9);
  const [bins, setBins] = useState(50);
  const [render, setRender] = useState(false);
  const [graph, setgr] = useState(50);
  const containerRef = useRef(null);

  //create graph
  useEffect(() => {
    setgr(
      Scatterplot(data, setData, {
        x: (d) => d[0],
        y: (d) => d[1],
        height: width / 3.333333333,
        width: width / 3.3333333333,
        color: "steelblue",
        xDomain: [-5, 5],
        yDomain: [-5, 5],
        fill: "steelblue",
        stroke: "none",
        r: 5,
      }).node()
    );
  }, [data, bins, width]);

  //get new data
  const reRender = () => {
    console.log(data);
    setRender(!render);
  };
  function logData() {
    console.log(data);
  }
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
