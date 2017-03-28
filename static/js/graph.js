/**
 * Created by Chris on 17/03/2017.
 */
queue()
   .defer(d3.json, "/anime")
   .await(makeGraphs);


    //Create svg width and height variables
    //var svgWidth = 250,
    //    svgHeight = 270;

    //Create margin variable for chart
    //var margin = {top: 50, right: 0, bottom: 50, left: 50},
    //Apply margins to the canvas
    //canvasWidth = svgWidth + margin.right + margin.left;
    //canvasHeight = svgHeight + margin.top + margin.bottom;

    //Create spacing
    //var spacing = 2;

    //Retrieve data
    function makeGraphs(error, animeData) {

    animeData.forEach(function(d) {
        d.rating = +d.rating;
        d.members = +d.members;
        d.episodes = +d.episodes

    });
    //Crossfilter Instance
    var ndx = crossfilter(animeData);

    var ratingDim = ndx.dimension(function(d) {return d.rating});

    var membersDim = ndx.dimension(function(d){return d.members});


    var animeByRating = ratingDim.group().top(10);
    var animeByMembers = membersDim.group();


    //Value for xAxis barchart
    var bottomX = ratingDim.bottom(1)[0].value;
    var topX = ratingDim.top(1)[0].value;
    var bottomMembers = membersDim.bottom(1)[0].value;
    var topMembers = membersDim.top(1)[0].value;

    var barChart = dc.barChart("#bar-chart")
    barChart
        .width(250)
        .height(350)
        .margins({top: 30, right: 0, bottom: 30, left: 50})
        .dimension(ratingDim)
        .group(animeByRating)
        .x(d3.scale.ordinal().domain([bottomX, topX]))
        .dimension(membersDim)
        .group(animeByMembers)
        .y(d3.scale.linear().domain([bottomMembers, topMembers]))
        .elasticY(true)
        .xAxisLabel("Rating")
        .yAxisLabel("Members");



    dc.renderAll();


    //Assign maximum members to a variable
  /*  var maxMembers = d3.max(animeData, function(d){return d.members;});

    //Create a height scale
    var heightScale = d3.scale.linear()
        .domain([0, maxMembers])
        .range([0,svgHeight]);

    //Create a scale for yAxis
    var yAxisScale = d3.scale.linear()
        .domain([0, maxMembers])
        .range([svgHeight, 0]);

    //create a scale for xAxis
    var xAxisScale = d3.scale.ordinal()
        .domain(animeData.map(function(d) {return d.rating;}))
        .rangeBands([0, svgWidth]);

    //Create a color scale scale
    var colorScale = d3.scale.linear()
        .domain([0, maxMembers])
        .range(["pink", "red"]);

    //Create a tooltip
    var tooltip = d3.select('#series-chart')
        .append("div")
        .classed("hidden", true)
        .attr("id", "tooltip");

    //Position yAxis and apply ticks
    var yAxis = d3.svg.axis()
        .scale(yAxisScale)
        .orient("left")
        .ticks(8);


    //Position xAxis and apply ticks
    var xAxis = d3.svg.axis()
        .scale(xAxisScale)
        .orient("bottom")
	    .ticks(animeData.length);


    //Create canvas, append svg
    var canvas = d3.select("#series-chart")
        .append("svg")
        .attr("id", "svgTooltip")
        .attr("width",canvasWidth)
        .attr("height",canvasHeight)
        .attr("style","background-color:#2a2a2a");


    canvas.append('g')
        .attr("class", "axis")
        .attr("transform", "translate(" + (margin.left) +","+ margin.bottom + ")")
        .call(yAxis)
        .append("text")
        .attr("y", -10)
        .style("text-anchor", "end")
        .text("Members");

    canvas.append("g")
        .attr("class", "axis")
        .attr("transform","translate("+ margin.left +","+ (canvasHeight - (margin.bottom)) + ")")
        .call(xAxis)
        .append("text")
        .attr("y", 35)
        .attr("x", 100)
        .style("text-anchor", "middle")
        .text("Rating");

    var svg = canvas.append("g")
        .attr("width",svgWidth)
        .attr("height",svgHeight)
        .attr("style","background-color:#2a2a2a")
        .attr("transform","translate("+ margin.left +"," + margin.bottom + ")");

    svg.selectAll('rect')
        .data(animeData)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {return i * (svgWidth / animeData.length);})
        .attr("y", function(d) {return svgHeight - heightScale(d.members);})
        .attr('width', (svgWidth / animeData.length) - spacing)
        .attr('height', function(d){return heightScale(d.members)})
        .on("mouseover", function(d){
            d3.select("#tooltip")
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY) + "px")
                .classed("hidden", false);
                tooltip.html(d.members + " members");
        })
        .on("mouseout", function(){
            d3.select("#tooltip")
                .classed("hidden", true);
        })
        .attr('fill', function(d){return(colorScale(d.members));});  */



};