/**
 * Created by Chris on 19/03/2017.
 */
$(document).ready(function() {

    $(".img-top").mouseenter(function() {
        $(this).addClass("hover-top");
    });
    $(".img-top").mouseleave(function() {
        $(this).removeClass("hover-top");
    });

    $(".img-middle").mouseenter(function() {
        $(this).addClass("hover-mid");
    });
    $(".img-middle").mouseleave(function() {
        $(this).removeClass("hover-mid");
    });

    $(".img-bottom").mouseenter(function() {
        $(this).addClass("hover-bottom");
    });
    $(".img-bottom").mouseleave(function() {
        $(this).removeClass("hover-bottom");
    });


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

        var membersDim = ndx.dimension(function (d) {
            return d.members;
        });

        //Select a random anime for home page button
        var top = membersDim.top(size);
        var randFunc = function () {
            var randAnime = top[Math.floor(Math.random() * size)];
            return randAnime;
        };
        //Home page random pick button
        //$("#random").on('click', function () {

            var randArray = [randFunc()];

            var dataTableRandom = dc.dataTable('#random-table');
            dataTableRandom
                .dimension(membersDim)
                .group(randArray)
                //.showGroups(false)
                .columns([
                    {
                        label: "Title:",
                        format: function (d) {
                            return d.name
                        }
                    }
                ]);

            //$('#random-table').toggle();
       // });

    }


});