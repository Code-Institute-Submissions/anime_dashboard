/**
 * Created by Chris on 19/03/2017.
 */
$(document).ready(function() {

    $(".box").mouseenter(function() {
        $(this).addClass("hover");
    });
    $(".box").mouseleave(function() {
        $(this).removeClass("hover");
    });

    $(".btn")


//Change select menu event styles
    $('option').on('click', function() {
        $(this).css("background-color", 'red');
    });





});