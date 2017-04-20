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







});