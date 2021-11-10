import * as d3 from "d3";
function Place($0, width, height, setData) {
  const xScale = d3.scaleLinear([-5, 5], [0, width]);
  const yScale = d3.scaleLinear([-5, 5], [0, height]);
  let selected = $0[0];

  const svg = d3
    .create("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("tabindex", 1)
    .attr("pointer-events", "all")
    .call(d3.drag().subject(dragsubject));

  svg.append("style").text(`
svg[tabindex] {
display: block;
border: none;
box-sizing: border-box;
}
svg[tabindex]:focus {
outline: none;
border: none;
}
`);

  svg
    .append("rect")
    .attr("fill", "none")
    .attr("width", width)
    .attr("height", height);

  svg
    .append("path")
    .datum($0)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 1.5)
    .call(update);

  function update() {
    console.log(xScale(1));
    const circle = svg.selectAll("g").data($0, (d) => d);
    circle
      .enter()
      .append("g")
      .call((g) => g.append("circle").attr("r", 30).attr("fill", "none"))
      .call((g) =>
        g
          .append("circle")
          .attr("r", 0)
          .attr("stroke", "black")
          .attr("stroke-width", 1.5)
          .transition()
          .duration(750)
          .ease(d3.easeElastic)
          .attr("r", 5)
      )
      .merge(circle)
      .attr("transform", (d) => `translate(${xScale(d[0])},${xScale(d[1])})`);

    circle.exit().remove();
  }

  function dragsubject(event) {
    let subject;
    $0.push((subject = [xScale.invert(event.x), yScale.invert(event.y)]));
    update();
    setData($0);
    return subject;
  }

  return { graph: svg, data: $0 };
}

export { Place };
