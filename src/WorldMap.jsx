import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import geoJson from "./merged_geojson.json";
import "./WorldMap.css";

const WorldMap = () => {
  const svgRef = useRef(); // Reference to SVG element
  const tooltipRef = useRef(); // Reference to Tooltip div
  const zoomRef = useRef(d3.zoom());

  useEffect(() => {
    const width = 960;
    const height = 600;

    // Create projection and path generator
    const projection = d3
      .geoMercator()
      .scale(150)
      .translate([width / 2, height / 2]);
    const path = d3.geoPath().projection(projection);

    // Select SVG and append it to DOM
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Tooltip div setup
    const tooltip = d3
      .select(tooltipRef.current)
      .style("position", "absolute")
      .style("background-color", "white")
      .style("border", "1px solid #d3d3d3")
      .style("padding", "8px")
      .style("border-radius", "4px")
      .style("opacity", 0);

    const colorScale = d3
      .scaleSequential(d3.interpolateYlOrRd)
      .domain([0, d3.max(geoJson.features, (d) => d.properties.avgDailyGHI)]);

    // Render GeoJSON data
    const countries = svg
      .selectAll("path")
      .data(geoJson.features)
      .join("path")
      .attr("d", path)
      .attr("fill", (d) => colorScale(d.properties.avgDailyGHI || 0)) // Use avgDailyGHI for color
      .attr("stroke", "#000")
      // .attr("fill", "#69b3a2")
      //.attr("stroke", "white")
      .attr("stroke-width", 0.5);

    // Zoom behavior
    const zoom = d3
      .zoom()
      .scaleExtent([1, 8])
      .on("zoom", (event) => {
        svg.selectAll("path").attr("transform", event.transform);
      });

    // Apply zoom to svg
    svg.call(zoomRef.current);

    // Zoom on country click
    countries.on("click", (event, d) => {
      const [[x0, y0], [x1, y1]] = path.bounds(d);
      const zoomScale = Math.min(
        8,
        0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)
      );
      const translate = [
        width / 2 - (zoomScale * (x0 + x1)) / 2,
        height / 2 - (zoomScale * (y0 + y1)) / 2,
      ];

      // Smooth zoom transition
      svg
        .transition()
        .duration(750)
        .call(
          zoom.transform,
          d3.zoomIdentity.translate(translate[0], translate[1]).scale(zoomScale)
        );
    });

    // Tooltip mouseover and mouseout events
    countries
      .on("mouseover", (event, d) => {
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(
            `<strong>${d.properties.SOVEREIGNT}</strong> 
          <strong>${d.properties.avgDailyGHI}</strong>`
          )
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 28}px`);
      })
      .on("mouseout", () => {
        tooltip.transition().duration(500).style("opacity", 0);
      });
  }, []);

  return (
    <div>
      <svg ref={svgRef}></svg>
      {/* Tooltip div that will appear on hover */}
      <div ref={tooltipRef} className="tooltip"></div>
    </div>
  );
};

export default WorldMap;
