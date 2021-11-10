import * as d3 from "d3";
import { GetCubicRoots } from "../../utils/roots";
function Bezier(width, height, x0, y0, cpx1, cpy1, cpx2, cpy2, x, y) {
  const Scale = d3.scaleLinear([0, 1], [0, width]);
  let lineX, lineY1, lineY2;
  lineY2 = 0;
  const svg = d3
    .create("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("tabindex", 1)
    .on("mousemove", (event) => {
      lineY1 = d3.pointer(event)[1];
      lineX = d3.pointer(event)[0];
      update();
    });

  const path = d3.path();
  path.moveTo(Scale(x0), Scale(y0));
  path.bezierCurveTo(
    Scale(cpx1),
    Scale(cpy1),
    Scale(cpx2),
    Scale(cpy2),
    Scale(x),
    Scale(y)
  );

  svg
    .append("rect")
    .attr("fill", "none")
    .attr("width", width)
    .attr("height", height);

  svg
    .append("line")
    .attr("id", "mouseline")
    .attr("stroke", "red")
    .attr("stroke-width", 2)
    .attr("x1", lineX)
    .attr("y1", lineY1)
    .attr("x2", lineX)
    .attr("y2", lineY2);

  svg
    .append("path")
    .attr("d", path)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 1.5);
  function update() {
    svg
      .select("#mouseline")
      .attr("x1", lineX)
      .attr("y1", lineY1)
      .attr("x2", Scale(bezPoint(Scale.invert(lineX))[1]))
      .attr("y2", Scale(bezPoint(Scale.invert(lineX))[0]));
  }

  function bezPoint(xpoint) {
    let xcoord = [x0, cpx1, cpx2, x];
    xcoord.forEach((i, index) => {
      xcoord[index] -= xpoint;
    });
    console.log(xcoord);
    let t = GetCubicRoots(xcoord[0], xcoord[1], xcoord[2], xcoord[3]);
    let i = [];
    //console.log({ t: t });
    // y values
    i.push(
      (1 - t) * (1 - t) * (1 - t) * y0 +
        3 * (1 - t) * (1 - t) * t * cpy1 +
        3 * (1 - t) * t * t * cpy2 +
        t * t * t * y
    );
    //x values
    i.push(
      (1 - t) * (1 - t) * (1 - t) * x0 +
        3 * (1 - t) * (1 - t) * t * cpx1 +
        3 * (1 - t) * t * t * cpx2 +
        t * t * t * x
    );
    // console.log(i);
    return i;
  }

  return svg;
}
export { Bezier };
