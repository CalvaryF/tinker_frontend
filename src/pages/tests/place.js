import React, { useState, useEffect, useRef } from "react";
import Dash from "../../components/Dash";
import Graph from "../../components/Graph2";
import styled from "styled-components";
import { Scatterplot } from "../../components/graphs/scatterplot2";
import * as d3 from "d3";

const Main = styled.div`
  width: 50vw;
  height: 50vw;
  background-color: white;
  margin: 50px;
`;

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
    console.log("creating graph");
    setgr(
      Scatterplot(data, setData, {
        x: (d) => d[0],
        y: (d) => d[1],
        height: width / 2,
        width: width / 2,
        color: "steelblue",
        xDomain: [-5, 5],
        yDomain: [-5, 5],
        fill: "steelblue",
        stroke: "none",
        r: 5,
      }).node()
    );
  }, [bins, width]);

  useEffect(() => {
    const div = d3.select(containerRef.current);
    div
      .selectAll("span")
      .data([1])
      .join(
        (enter) => enter.append("span"),
        (update) => update.append("span").append(() => graph),
        (exit) => exit.remove()
      );
  }, [graph]);
  //get new data
  function logData() {
    console.log(data);
  }

  return (
    <>
      <Main ref={containerRef}></Main>
      <button onClick={logData}> log data</button>
    </>
  );
}
