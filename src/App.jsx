import "./App.css";
import Rainbow from "rainbowvis.js";
import * as d3 from "d3";

const DATA_URL =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

const SVG_WIDTH = 1000;
const SVG_HEIGHT = 400;
const SVG_PADDING = 60;
const SVG_PADDING_BOTTOM = 100;
const SVG_LEGEND_WIDTH = 700;

const COLOR_PALLETE = ["#1d4877", "#fff33b", "#ee3e32"];
const RANGE = 16;

function parseMonth(month) {
  return new Date(new Date(2000, month).getTime() - 1296000000);
}

function colorGenerator(colorArray, step) {
  const rb = new Rainbow();
  const result = [];
  rb.setNumberRange(0, step - 1);
  rb.setSpectrum(...colorArray);
  for (let i = 0; i < step; i++) {
    result.push(`#${rb.colorAt(i)}`);
  }
  return result;
}

const COLORS = colorGenerator(COLOR_PALLETE, RANGE);

function App() {
  d3.json(DATA_URL).then((data) => {
    const temperatures = data.monthlyVariance;
    const base_temperature = data.baseTemperature;

    const MIN_TEMP = d3.min(temperatures, (t) => t.variance + base_temperature);
    const MAX_TEMP = d3.max(temperatures, (t) => t.variance + base_temperature);
    const MAX_YEAR = d3.max(temperatures, (t) => t.year);
    const MIN_YEAR = d3.min(temperatures, (t) => t.year);

    //create scale
    const xScale = d3
      .scaleLinear()
      .range([0, SVG_WIDTH])
      .domain([MIN_YEAR, MAX_YEAR]);
    const yScale = d3
      .scaleTime()
      .range([0, SVG_HEIGHT])
      .domain([
        d3.min(temperatures, () => parseMonth(0)),
        d3.max(temperatures, () => parseMonth(12)),
      ]);

    //create legend label
    const STEP_SCALE = (MAX_TEMP - MIN_TEMP) / RANGE;
    const LEGEND_BAND = () => {
      const array = [];
      for (let i = 0; i <= RANGE; i++) {
        array.push(MIN_TEMP + STEP_SCALE * i);
      }
      return array;
    };
    const legendScale = d3
      .scaleLinear()
      .domain([MIN_TEMP, MAX_TEMP])
      .range([0, SVG_LEGEND_WIDTH]);

    //add sgv
    const svg = d3
      .select("#chart-wrapper")
      .append("svg")
      .attr("width", SVG_WIDTH + 2 * SVG_PADDING)
      .attr("height", SVG_HEIGHT + 1.5 * SVG_PADDING);

    svg
      .append("g")
      .call(d3.axisBottom(xScale).tickFormat(d3.format("d")))
      .attr("id", "x-axis")
      .attr(
        "transform",
        `translate(${SVG_PADDING},${SVG_HEIGHT + SVG_PADDING / 2})`
      );
    svg
      .append("g")
      .attr("id", "y-axis")
      .call(d3.axisLeft(yScale).ticks(12).tickFormat(d3.timeFormat("%B")))
      .attr("transform", `translate(${SVG_PADDING},${SVG_PADDING / 2})`);

    // create legend
    const legend = d3
      .select("#chart-wrapper")
      .append("svg")
      .attr("id", "legend")
      .attr("width", SVG_WIDTH + 2 * SVG_PADDING)
      .attr("height", 2 * SVG_PADDING);
    //create legendbar
    legend
      .append("g")
      .call(
        d3
          .axisBottom(legendScale)
          .ticks(MIN_TEMP, MAX_TEMP)
          .tickValues(LEGEND_BAND())
          .tickFormat(d3.format(",.2f"))
      )
      .attr("transform", `translate(${SVG_PADDING},${SVG_PADDING})`);
    //create legend colorbox
    legend
      .selectAll()
      .data(COLORS)
      .enter()
      .append("rect")
      .attr("width", SVG_LEGEND_WIDTH / RANGE)
      .attr("height", SVG_LEGEND_WIDTH / RANGE / 2)
      .style("fill", (d) => d)
      .attr("x", (_, i) => SVG_PADDING + legendScale(LEGEND_BAND()[i]))
      .attr("y", SVG_PADDING - SVG_LEGEND_WIDTH / RANGE / 2);

    //tooltip
    const tooltip = d3
      .select("#chart-wrapper")
      .append("div")
      .attr("id", "tooltip")
      .style("padding", "0.2rem 0.8rem")
      .style("position", "absolute")
      .style("display", "none")
      .style("width", 100 + "px");

    //add data
    svg
      .selectAll()
      .data(temperatures)
      .enter()
      .append("rect")
      .attr("class", "cell")
      .attr("data-month", (d) => d.month - 1)
      .attr("data-temp", (d) => d.variance + base_temperature)
      .attr("data-var", (d) => d.variance)
      .attr("data-year", (d) => d.year)
      .attr("x", (d) => SVG_PADDING + xScale(d.year))
      .attr(
        "y",
        (d) => SVG_PADDING / 2 - SVG_HEIGHT / 12 + yScale(parseMonth(d.month))
      )
      .attr("height", SVG_HEIGHT / 12)
      .attr("width", SVG_WIDTH / (MAX_YEAR - MIN_YEAR))
      .style(
        "fill",
        (d) =>
          COLORS[
            Math.floor((d.variance + base_temperature - MIN_TEMP) / STEP_SCALE)
          ]
      )
      .on("mouseover", (e) => {
        e.preventDefault();
        const month = e.target.dataset.month;
        const year = e.target.dataset.year;
        const temp = e.target.dataset.temp;
        const vari = e.target.dataset.var;
        tooltip
          .attr("data-year", year)
          .style("display", "block")
          .style("background-color", "white")
          .style("border-radius", "0.5rem")
          .style("color", "black").html(`
          <p style="font-size:0.9rem">
            ${parseMonth(month + 1).toLocaleString("default", {
              month: "short",
            })} ${year} 
          </p> 
          <p style="font-size: 0.7rem">
            ${parseFloat(temp).toFixed(2)}℃    
            <sup style="font-size:0.5rem;color:black">(${parseFloat(
              vari
            ).toFixed(2)}℃)</sup>
          </p>
          `);
      })
      .on("mousemove", (e) => {
        e.preventDefault();
        tooltip
          .style(
            "left",
            e.clientX + SVG_PADDING + 20 + 100 > window.innerWidth
              ? e.clientX + 20 - 100 + "px"
              : e.clientX + 20 + "px"
          )
          .style("top", e.clientY + 20 + "px");
      })
      .on("mouseleave", () => {
        tooltip.style("display", "none").attr("data-year", "").html("");
      });
  });

  return (
    <div className="screen">
      <div className="main">
        <h2 id="title">Monthly Global Land-Surface Temperature</h2>
        <h3 id="description">1753 - 2015: base temperature 8.66℃</h3>
        <div id="chart-wrapper"></div>
      </div>
    </div>
  );
}

export default App;
