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

        //Dimensions
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

        var countAnime = ratingDim.group().reduceCount(function(d){return d.rating})
        //Group data by rating
        var animeByRating = nameDim.group().reduce(
            function(ratings, v) {
                ratings.push(v.rating);
                return ratings;
            },
            function(ratings, v){
                var ratingIndex = ratings.indexOf(v.rating);
                ratings.splice(ratingIndex, 1);
                return ratings;
            },
            function(){return [];});


        //Group data by type
        var typeGroup = typeDim.group();


       //Line Chart for smaller screen
        var lineChartSmall = dc.lineChart("#small-line-chart");
        lineChartSmall
            .width(340)
            .height(300)
            .margins({top: 30, right: 30, bottom: 30, left: 70})
            .elasticY(true)
            .dimension(ratingDim)
            .group(animeByMembers)
            .renderArea(true)
            .x(d3.scale.linear().domain([1,10]))
            .yAxisLabel("Members");


         //Line Chart for medium screen
        var lineChartMid = dc.lineChart("#mid-line-chart");
        lineChartMid
            .width(750)
            .height(300)
            .margins({top: 30, right: 30, bottom: 30, left: 70})
            .elasticY(true)
            .dimension(ratingDim)
            .group(animeByMembers)
            .renderArea(true)
            .x(d3.scale.linear().domain([1,10]))
            .yAxisLabel("Members");



        //Line Chart for bigger screen
        var lineChartBig = dc.lineChart("#big-line-chart");
        lineChartBig
            .width(850)
            .height(350)
            .margins({top: 30, right: 30, bottom: 30, left: 70})
            .elasticY(true)
            .dimension(ratingDim)
            .group(animeByMembers)
            .renderArea(true)
            .x(d3.scale.linear().domain([1,10]))
            .yAxisLabel("Members");


        //Select Menu
        var selectMenu = dc.selectMenu('#select-chart');
        selectMenu
            .dimension(nameDim)
            .group(animeByRating)
            .valueAccessor(function(ratings){return ratings.value[0];})
            .multiple(true)
            .controlsUseVisibility(true)
            .order(function(a,b){
                return a.value > b.value ? -1 : b.value > a.value ? 1 : 0; //Link to stack overflow
            });


        //var colourScale = d3.scale.ordinal().range(["#0a9740", "#059d39", "#136629", "#113818", "#132412"])
        //Pie chart
        var pieChart = dc.pieChart("#pie-chart");
        pieChart
            .width(240)
            .height(240)
            .slicesCap(5)
            .innerRadius([50])
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
                    label: "Title:",
                    format: function(d){ return d.name}
                }
            ]);

        var dataTableRating = dc.dataTable('#data-table-chart-two');
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
                },
                {
                    label: "Members",
                    format: function(d){ return d.members}
                }
            ]);


        var dataTableGenre = dc.dataTable('#data-table-chart-three');
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
                    label: "Genre:",
                    format: function(d){
                        if(d.genre === "") {
                            return "Unknown"
                        }else{
                            return d.genre;
                        }},
                }
            ]);

        var dataTableEpisodes = dc.dataTable('#data-table-chart-four');
        dataTableEpisodes
            .beginSlice(0)
            .endSlice(1)
            .dimension(ratingDim)
            .group(function(d){
                return 1
            })
            .showGroups(false)
            .columns([
                {
                    label: "Episodes:",
                    format:function(d){
                        if (d.episodes != 1) {
                            return d.episodes
                        }else{
                            return d.type
                        }}
                },
            ]);

        var dataTableEpisodes = dc.dataTable('#data-table-chart-small');
        dataTableEpisodes
            .beginSlice(0)
            .endSlice(1)
            .dimension(ratingDim)
            .group(function(d){
                return 1
            })
            .showGroups(false)
            .columns([
                {
                    label: "Title:",
                    format: function(d){ return d.name}
                },
                {
                    label: "Episodes:",
                    format:function(d){
                        if (d.episodes != 1) {
                            return d.episodes
                        }else{
                            return d.type
                        }}
                },
                {
                    label: "Genre:",
                    format: function(d){
                        if(d.genre === "") {
                            return "Unknown"
                        }else{
                            return d.genre;
                        }},
                },
                 {
                    label: "Rating",
                    format: function(d){ return d.rating}
                },
                {
                    label: "Members",
                    format: function(d){ return d.members}
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
        AddXAxis(lineChartSmall, "Rating");

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
        AddXAxis(lineChartMid, "Rating");

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
        AddXAxis(lineChartBig, "Rating");


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