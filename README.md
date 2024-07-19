# heat-map

This is a project to fulfiled <code>Data Visualization</code> Course provided by freeCodeCamp.

Goals: Build an app that is functionally similar to this https://heat-map.freecodecamp.rocks using the following [database](https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json).

In this project, the tech stack was used ReactJS, d3.js and CSS. Vite was used to built instead of the conventional ones, CRA.<br>
Check out the live demo [here](https://ndtrung-dev.github.io/heat-map).

## Requirements:

### User story:

> 1. My heat map should have a title with a corresponding<code>id="title"</code>.
>
> 1. My heat map should have a description with a corresponding<code>id="description"</code>.
>
> 1. My heat map should have an x-axis with a corresponding<code>id="x-axis"</code>.
>
> 1. My heat map should have a y-axis with a corresponding<code>id="y-axis"</code>.
>
> 1. My heat map should have <code>rect</code> elements with a <code>class="cell"</code> that represent the data.
>
> 1. There should be at least 4 different fill colors used for the cells.
>
> 1. Each cell will have the properties <code>data-month</code>, <code>data-year</code>,<code>data-temp</code> containing their corresponding month, year, and temperature values.
>
> 1. The <code>data-month</code>, <code>data-year</code> of each cell should be within the range of the data.
>
> 1. My heat map should have cells that align with the corresponding month on the y-axis.
>
> 1. My heat map should have cells that align with the corresponding year on the x-axis.
>
> 1. My heat map should have multiple tick labels on the y-axis with the full month name.
>
> 1. My heat map should have multiple tick labels on the x-axis with the years between 1754 and 2015.
>
> 1. My heat map should have a legend with a corresponding<code>id="legend"</code>.
>
> 1. My legend should contain <code>rect</code> elements.
>
> 1. The <code>rect</code> elements in the legend should use at least 4 different fill colors.
>
> 1. I can mouse over an area and see a tooltip with a corresponding<code>id="tooltip"</code> which displays more information about the area.
>
> 1. My tooltip should have a <code>data-year</code> property that corresponds to the <code>data-year</code> of the active area.

### Testing tools

<em>FCC Testing CDN</em> (https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js) is provided by freeCodeCamp

## Result

All checkpoint passed!

Source code uploaded to [github](https://github.com/ndtrung-dev/heat-map).

[Live demo](https://ndtrung-dev.github.io/heat-map) is uploaded to github using <code>gh-pages</code>. <em>FCC Testing CDN</em> was embedded. Select <code>D3: Heat Map</code> option from dropdown menu to verify the result.
