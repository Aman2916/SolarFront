import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { parse } from "date-fns";

const IrradianceChart = () => {
  const [data, setData] = useState(null);
  const chartRef = useRef();

  useEffect(() => {
    const loadData = async () => {
      try {
        const loadedData = await d3.csv("/Indore.csv", (d) => {
          const parsedDate = d3.timeParse("%Y-%m-%dT%H:%M:%S%Z")(d.period_end);
          const parsedGHI = parseFloat(d.ghi);
          return parsedDate && !isNaN(parsedGHI)
            ? { date: parsedDate, ghi: parsedGHI }
            : null;
        });

        const filteredData = loadedData.filter((d) => d !== null);
        const dailyData = d3
          .rollups(
            filteredData,
            (values) => d3.mean(values, (d) => d.ghi), // Calculate daily average GHI
            (d) => d3.timeDay(d.date) // Group by day
          )
          .map(([date, avgGHI]) => ({ date, ghi: avgGHI }));

        // 7 day
        const movingAvgData = dailyData.map((d, i, arr) => {
          const slice = arr.slice(Math.max(0, i - 6), i + 1); // Last 7 days
          const movingAvg = d3.mean(slice, (d) => d.ghi);
          return { ...d, GHI_7day_avg: movingAvg };
        });
        console.log("Filtered Data:", filteredData);
        setData(movingAvgData);
        //console.log(movingAvgData);
      } catch (error) {
        console.error("Error loading the CSV data:", error);
      }
    };

    loadData();
  }, []);
  useEffect(() => {
    if (!data) return;
    //console.log(data[0]);
    const width = 15000;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    d3.select(chartRef.current).selectAll("*").remove();

    const svg = d3
      .select(chartRef.current)
      .attr("width", width)
      .attr("height", height);

    data.forEach((d) => {
      d.date = d.date;
      d.ghi = +d.ghi;
      d.GHI_7day_avg = +d.GHI_7day_avg;
      console.log(d.date);
    });

    // Check if the dates are being parsed correctly
    // console.log(
    //   "Parsed Dates:",
    //   data.map((d) => d.date)
    // );

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date))
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => Math.max(d.ghi, d.GHI_7day_avg)) || 1])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // console.log("xScale domain:", xScale.domain());
    // console.log("yScale domain:", yScale.domain());

    const xAxis = d3
      .axisBottom(xScale)
      .ticks(d3.timeMonth.every(1))
      .tickFormat(d3.timeFormat("%B"));

    const yAxis = d3.axisLeft(yScale);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "middle");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(yAxis);

    const barWidth = 10;

    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.date) - barWidth / 2)
      .attr("y", (d) => yScale(d.ghi))
      .attr("width", barWidth)
      .attr("height", (d) => height - margin.bottom - yScale(d.ghi))
      .attr("fill", "grey")
      .attr("opacity", 0.6);

    const line = d3
      .line()
      .defined((d) => !isNaN(d.GHI_7day_avg))
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.GHI_7day_avg));

    svg
      .append("path")
      .datum(data)
      .attr("d", line)
      .attr("stroke", "cyan")
      .attr("stroke-width", 2)
      .attr("fill", "none");
  }, [data]);

  return (
    <div>
      <h2>Solar Irradiance Daily Values and 7-Day Moving Average</h2>
      {!data ? <p>Loading data...</p> : null}
      <svg ref={chartRef}></svg>
    </div>
  );
};

export default IrradianceChart;
