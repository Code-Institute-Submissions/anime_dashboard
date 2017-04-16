/**
 * Created by Chris on 17/03/2017.
 */
$(document).ready(function() {

    queue()
        .defer(d3.json, "/anime")
        .await(makeGraphs);


        //Retrieve data
    function makeGraphs(error, animeData) {

        animeData.forEach(function (d) {
            d.rating = +d.rating;
            d.members = +d.members;
        });


        //Crossfilter Instance
        var ndx = crossfilter(animeData);
        var size = ndx.size();


        //Dimensions
        var membersDim = ndx.dimension(function (d) {
            return d.members;
        });

        var ratingDim = ndx.dimension(function (d) {
            return d.rating;
        });

        var typeDim = ndx.dimension(function (d){
            return d.type;
        });

        var nameDim = ndx.dimension(function (d){
            return d.name;
        });



        //Group data by members
        var animeByMembers = ratingDim.group().reduceSum(function(d){return d.members});
        //Group data by rating
        var animeByRating = nameDim.group().reduceSum(function(d){return d.rating});
        //Group data by type
        var typeGroup = typeDim.group();


        //Line Chart
        var lineChart = dc.lineChart("#line-chart");
        lineChart
            .width(860)
            .height(350)
            .margins({top: 30, right: 30, bottom: 30, left: 70})
            .elasticY(true)
            .dimension(ratingDim)
            .group(animeByMembers)
            .renderArea(true)
            .brushOn(true)
            .x(d3.scale.linear().domain([0,10]))
            .yAxisLabel("Members");


        //Select Menu
        var selectMenu = dc.selectMenu('#select-chart');
        selectMenu
            .dimension(nameDim)
            .group(animeByRating)
            .multiple(true)
            .controlsUseVisibility(true)
            .order(function(a,b){
                return a.value > b.value ? -1 : b.value > a.value ? 1 : 0;
            });


        //var colourScale = d3.scale.ordinal().range(["#0a9740", "#059d39", "#136629", "#113818", "#132412"])
        //Pie chart
        var pieChart = dc.pieChart("#pie-chart");
        pieChart
            .width(220)
            .height(220)
            .slicesCap(6)
            .dimension(typeDim)
            .group(typeGroup)
            //.colors(colourScale)
            .legend(dc.legend().x(240).y(0).gap(5));


        //Data table
        var dataTableName = dc.dataTable('#data-table-chart-one');
        dataTableName
            .beginSlice(0)
            .endSlice(1)
            .dimension(ratingDim)
            .group(function(d){
                return 1
            })
            .showGroups(false)
            .columns([
                {
                    label: "Name",
                    format: function(d){ return d.name}
                }
            ]);

        var dataTableGenre = dc.dataTable('#data-table-chart-two');
        dataTableGenre
            .beginSlice(0)
            .endSlice(1)
            .dimension(ratingDim)
            .group(function(d){
                return 1
            })
            .showGroups(false)
            .columns([
                {
                    label: "Genre",
                    format: function(d){
                        if(d.genre === "") {
                            return "Unknown"
                        }else{
                            return d.genre;
                        }},
                }
            ]);


        var dataTableEp = dc.dataTable('#data-table-chart-three');
        dataTableEp
            .beginSlice(0)
            .endSlice(1)
            .dimension(ratingDim)
            .group(function(d){
                return 1
            })
            .showGroups(false)
            .columns([
                {
                    label: "Episodes",
                    format:function(d){
                        if (d.episodes != 1) {
                            return d.episodes
                        }else{
                            return d.type
                        }}
                }
            ]);

        var dataTableRating = dc.dataTable('#data-table-chart-four');
        dataTableRating
            .beginSlice(0)
            .endSlice(1)
            .dimension(ratingDim)
            .group(function(d){
                return 1
            })
            .showGroups(false)
            .columns([
                {
                    label: "Rating",
                    format: function(d){ return d.rating}
                }
            ]);


        dc.renderAll();


        //Add xAxis label to row chart
        function AddXAxis(lineChartUpdate, displayText) {
            lineChartUpdate
            .svg()
            .append("text")
            .attr("class", "x-axis-label")
            .attr("text-anchor", "middle")
            .attr("x", lineChartUpdate.width()/2)
            .attr("y", lineChartUpdate.height()-3.5)
            .text(displayText);
        }
        AddXAxis(lineChart, "Rating");


        window.ratingObject = membersDim;

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
});