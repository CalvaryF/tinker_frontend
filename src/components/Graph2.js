import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { select } from "d3";

const Main = styled.div`
  width: 30vw;
  height: 30vw;
  background-color: white;
`;

export default function Graph({ graph }) {
  const containerRef = useRef(null);
  useEffect(() => {
    const div = select(containerRef.current);
    div
      .selectAll("span")
      .data([1])
      .join(
        (enter) => enter.append("span"),
        (update) => update.append("span").append(() => graph),
        (exit) => exit.remove()
      );
  }, [graph]);

  return <Main ref={containerRef}></Main>;
}
