import geojsonData from "./merged_geojson.json";
const svg = d3.select("svg");

const projection = d3
  .geoNaturalEarth1()
  .scale(150)
  .translate([svg.attr("width") / 2, svg.attr("height") / 2]);

const path = d3.geoPath().projection(projection);

// Define a color scale based on GHI values
const colorScale = d3
  .scaleSequential(d3.interpolateYlOrRd)
  .domain([0, d3.max(geojsonData.features, (d) => d.properties.avgDailyGHI)]);

svg
  .selectAll("path")
  .data(geojsonData.features)
  .enter()
  .append("path")
  .attr("d", path)
  .attr("fill", (d) => colorScale(d.properties.avgDailyGHI || 0)) // Use avgDailyGHI for color
  .attr("stroke", "#000");

// Add tooltips to display GHI info on hover
svg.selectAll("path").on("mouseover", (event, d) => {
  // Show country name and GHI values
  const ghiInfo = `${d.properties.name}: ${d.properties.avgDailyGHI} kWh/m²/day`;
  // Display tooltip logic here
});
