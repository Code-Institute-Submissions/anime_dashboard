/**
 * Created by Chris on 18/06/2017.
 */
//http://www.kriesi.at/archives/create-simple-tooltips-with-css-and-jquery

function ref_tooltip(target, name) {
    $(target).each(function (i) {
        $("body").append("<div class='" + name + "' id='" + name + i + "'><p>" + $(this).attr('title') + "</p></div>");

        var my_tooltip = $("#" + name + i);

        if($(this).attr("title") !== "" && $(this).attr("title") !== "undefined" ){ // checks if there is a title

            $(this).removeAttr("title").mouseover(function () {
                my_tooltip.css({opacity: 0.8, display: "none"}).fadeIn(200);

            }).mousemove(function (kmouse) {
                var border_top = $(window).scrollTop();
                var border_right = $(window).width();
                var left_pos;
                var top_pos;
                var offset = 15;

                if(border_right - (offset *2) >= my_tooltip.width() + kmouse.pageX){
					left_pos = kmouse.pageX+offset;
					} else{
					left_pos = border_right-my_tooltip.width()-offset;
					}

				if(border_top + (offset *2)>= kmouse.pageY - my_tooltip.height()){
					top_pos = border_top +offset;
                }else{
					top_pos = kmouse.pageY-my_tooltip.height()-offset;
                }

                my_tooltip.css({left:left_pos, top:top_pos});

            }).mouseout(function () {
                my_tooltip.fadeOut(200);
            });

        }


    });
}

$(document).ready(function(){
	 ref_tooltip("td","tooltip");
});