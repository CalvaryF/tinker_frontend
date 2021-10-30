import React, { useState, useLayoutEffect, useRef } from "react";
import { Histogram } from "../../utils/d3utils";
import { select } from "d3";
import * as d3 from "d3";

export default function Home() {
  const [data, setData] = useState([25, 13, 45, 60, 25]);
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const svg = select(containerRef.current);
    const detachedG = d3.create("svg:g");
    svg
      .selectAll("circle")
      .data(data)
      .join(
        (enter) =>
          enter
            .append("circle")
            .attr("r", (value) => value)
            .attr("cx", (value) => value * 2)
            .attr("cx", (value) => value * 2),
        (update) => update.attr("class", "updated"),
        (exit) => exit.remove()
      );
  }, [data]);
  return (
    <>
      <svg ref={containerRef}></svg>
    </>
  );
}
