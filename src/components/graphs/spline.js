import * as d3 from "d3";
function Spline($0, width, height) {
  let selected = $0[0];

  const svg = d3
    .create("svg")
    .attr("viewBox", [-14, 0, width + 28, height])
    .attr("tabindex", 1);

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
    svg.select("path").attr("d", d3.line().curve(d3.curveNatural));

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
      .attr("transform", (d) => `translate(${d})`)
      .select("circle:last-child")
      .attr("fill", (d) => (d === selected ? "lightblue" : "black"));

    circle.exit().remove();
  }

  return svg;
}
export { Spline };
