import React, { useEffect, useRef, useState } from "react";
import { select } from "d3";

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

  return <div ref={containerRef}></div>;
}
