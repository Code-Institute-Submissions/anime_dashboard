/**
 * Created by Chris on 17/03/2017.
 */
queue()
   .defer(d3.json, "/animeData/anime")
   .await(makeGraphs);


 //Create a Crossfilter instance
   var ndx = crossfilter(animeDataAnime);

   //Define Dimensions
   var nameDim = ndx.dimension(function (d) {
       return d["name"];
   });
   var genreDim = ndx.dimension(function (d) {
       return d["genre"];
   });
   var typeDim = ndx.dimension(function (d) {
       return d["type"];
   });
   var episodesDim = ndx.dimension(function (d) {
       return d["episodes"];
   });

   var ratingDim = ndx.dimension(function (d) {
       return d["rating"];
   });

   var groupMembersDim = ndx.dimension(function (d) {
       return d["members"];
   });


   //Calculate metrics
    var name = nameDim.group();
    var genre = genreDim.group();
    var type = typeDim.group();
    var episodes = episodesDim.group();
    var rating = ratingDim.group();
    var members = groupMembersDim.group();

    //Define values (to be used in charts)
    var minRating = ratingDim.bottom(1)[0]["rating"];
    var maxRating = ratingDim.top(1)[0]["rating"];

    var minMembers = ratingDim.bottom(1)[0]["members"];
    var maxMembers = ratingDim.top(1)[0]["members"];

    //Charts
    var animeListChart = dc.dataTable("#list-chart")
    var genrePieChart = dc.pieChart('#pie-chart')
    var seriesChart = dc.seriesChart('#series-chart')
    var randomGenerator = dc.dataTable('#random-generator')
    var genreChart = dc.dataTable('#genre-generator')



// Highest rated anime in a table
animeListChart
    .dimension(nameDim, ratingDim)
    .group(function(d) {
        return d.value;
    })
    .showGroups(true)
    .columns(['',
        {
            format: function (d) {
                return d.name;
            }
        },
            '',
        {
            format: function(d) {
                return d.rating;
                }
        }]);

// Pie chart
genrePieChart
    .height(250)
    .radius(90)
    .transitionDuration(1500)
    .dimension(genreDim)
    .group(genre)

// Series Chart
seriesChart
    .height()
    .width()

//Random Generator
randomGenerator
    .height()
    .width()


