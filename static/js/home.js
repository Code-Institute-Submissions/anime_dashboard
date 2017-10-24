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

        //Home page 'lucky dip' button
        $("#random").on('click', function () {

            //Select a random anime and insert into table
            var top = membersDim.top(size);
            var randFunc = function () {
                var randAnime = top[Math.floor(Math.random() * size)];
                return randAnime;
            };

            var randArray = [randFunc()];


            var tbod = '<tbody>';
            for (i = 0; i < randArray.length; i++) {
                tbod += '<tr>';
                tbod += '<td>' + randArray[i].name + '</td>';
                tbod += '<td>' + randArray[i].genre + '</td>';
                tbod += '<td>' + randArray[i].rating + '</td>';
                tbod += '</tr>';
            }
            tbod += '</tbody>';
            document.getElementById('random-data').innerHTML = tbod;

            $('#random-table').toggle();

        });

    }
});