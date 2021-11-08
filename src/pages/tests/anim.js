import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { select } from "d3";
import * as d3 from "d3";
import styled from "styled-components";

const Main = styled.div`
  margin: 50px;
`;

const Svg = styled.svg`
  background-color: white;
`;

export default function Home() {
  const [data, setData] = useState([
    25, 13, 45, 60, 25, 100, 12, 300, 24, 19, 0, 76, 100, 2, 100, 2, 100, 2,
  ]);
  const [index, setIndex] = useState(0);
  const [position, setPosition] = useState([200, 200]);
  const containerRef = useRef(null);
  const play = () => {};

  useEffect(() => {
    const interval = setInterval(() => {
      if (index < data.length) {
        setIndex(index + 1);
      } else {
        setIndex(0);
      }

      d3.select(containerRef.current)
        .transition()
        .duration(0)
        .attr("cx", data[index])
        .attr("cy", position[1]);
    }, 1000);
    return () => clearInterval(interval);
  }, [index]);

  return (
    <Main>
      <button onClick={play}>play animation</button>
      <Svg width="1000" height="500">
        {" "}
        <circle ref={containerRef} cx="200" cy="200" r="50" />
      </Svg>
    </Main>
  );
}
