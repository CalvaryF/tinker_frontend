import React, { useState, useEffect, useRef } from "react";
const endpoint = "HTTP://127.0.0.1:8000/correlation/randomcorrelation";
import Dash from "../../components/Dash2";
import { Scatterplot } from "../../components/graphs/scatterplot2";
import * as d3 from "d3";
let index = 0;
let m = 0;
let b = 0;
export default function Home() {
  var w;
  var h;
  if (typeof window !== "undefined") {
    w = window.innerWidth;
    h = window.innerHeight;
  }
  const updateWidthAndHeight = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateWidthAndHeight);
    return () => window.removeEventListener("resize", updateWidthAndHeight);
  });
  //state
  const [width, setWidth] = useState(w);
  const [data, setData] = useState([[0, 0]]);
  const [size, setSize] = useState(1);
  const [cov, setCov] = useState(0.8);
  const [bins, setBins] = useState(50);
  const [render, setRender] = useState(false);
  const [graph, setgr] = useState(50);
  //const [m, setM] = useState(-1);
  //const [b, setB] = useState(0);
  // const [index, setIndex] = useState(0);
  const [anneal, setAnneal] = useState(1);

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
            setData(d.randomcorrelation);
          });
      }
    })();
  }, [size, render, cov]);

  //create graph
  useEffect(() => {
    console.log(`m:${m}`);
    console.log("graph");
    const g = Scatterplot(data, setData, {
      x: (d) => d[0],
      y: (d) => d[1],
      height: width / 3.333333333,
      width: width / 3.3333333333,
      color: "lightgrey",
      xDomain: [-5, 5],
      yDomain: [-5, 5],
      fill: "lightgrey",
      stroke: "none",
      r: 5,
    });
    const xScale = d3.scaleLinear([-5, 5], [50, width / 3.333333333 - 40]);
    const yScale = d3.scaleLinear([-5, 5], [width / 3.333333333 - 40, 30]);
    g.append("svg")
      .attr("id", "sid")
      .attr("y", "30")
      .attr("width", width / 3.333333333)
      .attr("height", width / 3.333333333 - 40 - 30)
      .append("line")
      .style("stroke", "red")
      .style("stroke-width", 2)
      .attr("id", "lineid")
      .attr("x1", xScale(-5))
      .attr("y1", yScale(m * -5 + b) - 30)
      .attr("x2", xScale(5))
      .attr("y2", yScale(m * 5 + b) - 30);

    g.append("line")
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("id", "errorid")
      .attr("x1", xScale(data[0][0]))
      .attr("y1", yScale(data[0][1]))
      .attr("x2", xScale(data[0][0]))
      .attr("y2", yScale(m * data[0][0] + b));

    g.append("circle")
      .attr("id", "circleid")
      .attr("cx", xScale(data[0][0]))
      .attr("cy", yScale(data[0][1]))
      .attr("r", width / (100 * 3.33333))
      .attr("fill", "#f00");
    setgr(g.node());
  }, [data, bins, width]);

  //get new data
  const reRender = () => {
    m = 0;
    m = 0;
    index = 0;
    setRender(!render);
  };
  //gradient
  useEffect(() => {
    const interval = setInterval(() => {
      if (data.length > 1) {
        let learning_rate = 0.001;
        //console.log(index);
        //console.log(data.length);
        if (index < data.length - 1) {
          index++;
        } else {
          index = 0;
        }
        let x = data[index][0];
        let y = data[index][1];
        var guess = m * x + b;
        var error = y - guess;

        m = m + error * x * learning_rate;
        b = b + error * learning_rate;

        const yScale = d3.scaleLinear([-5, 5], [width / 3.333333333 - 40, 30]);
        const xScale = d3.scaleLinear([-5, 5], [50, width / 3.333333333 - 40]);
        d3.select("#sid").raise();

        d3.select("#lineid")
          .raise()
          .transition()
          .duration(0)
          .attr("y1", yScale(m * -5 + b) - 30)
          .attr("y2", yScale(m * 5 + b) - 30);
        d3.select("#errorid")
          .raise()
          .transition()
          .duration(0)
          .attr("x1", xScale(data[index][0]))
          .attr("y1", yScale(data[index][1]))
          .attr("x2", xScale(data[index][0]))
          .attr("y2", yScale(m * data[index][0] + b));
        d3.select("#circleid")
          .raise()
          .transition()
          .duration(0)
          .attr("cx", xScale(data[index][0]))
          .attr("cy", yScale(data[index][1]));
      }
    }, 100);
    return () => clearInterval(interval);
  }, [data, width]);

  return (
    <>
      <Dash
        title="Linear Regression"
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
            <br />
            <br />
            <input
              onChange={(e) => setCov(e.target.value)}
              type="text"
              name="name"
            />
          </div>
        }
      ></Dash>
    </>
  );
}
