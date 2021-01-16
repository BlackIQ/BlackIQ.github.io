// Variables
"use strict";

var nbpics;
var currentpic;
var popup = $(".lx-popup");
var popupImg = $(".lx-popup-image img");
var popupTitle = $(".lx-popup-details ul li:eq(0) span");
var pupupCpic = $(".lx-popup-details ul li:eq(1) span");

// espand popup click event
$("i.fa-search-plus", ".lx-projects").on("click",function() {
    // set nbpics to 0
    nbpics = 0;
    // get the number of pictures
    for (var i = 0; i < $(".lx-projects-item", ".lx-projects").length; i++) {
        if ($(".lx-projects-item:eq(" + i + ")", ".lx-projects").parent().width() !== 0) {
            // increment the number of pictures
            nbpics += 1;
            // pot the number of picture in the attribute data
            $(".lx-projects-item:eq(" + i + ")", ".lx-projects").attr("data", nbpics);
        }
    }
    // get current picture number
    currentpic = $(this).parent().attr("data");
    // transmit information to the popup
    popupImg.attr("src", $(this).parent().find("img").attr("src"));
	window.setTimeout(function(){
		popupImg.css("transform", "scale(1)");
	},1);
    popupTitle.text($(this).parent().find("h4").text());
    pupupCpic.text(currentpic + " of " + nbpics);
    popup.css({
        "display": "block"
    });
    return false;
});

// popup left arrow click event
$(".lx-popup-inside a .fa-caret-left", ".lx-popup").on("click",function() {
    // test if the curent picture is equal to 1 or not
    if (currentpic === 1) {
        currentpic = nbpics;
    } else {
        currentpic = parseInt(currentpic) - 1;
    }
    // transmit information to the popup
    popupImg.attr("src", $(".lx-projects-item[data='" + currentpic + "'] img", ".lx-projects").attr("src"));
    popupTitle.text($(".lx-projects-item[data='" + currentpic + "'] h4", ".lx-projects").text());
    pupupCpic.text(currentpic + " of " + nbpics);
    return false;
});

// popup right arrow click event
$(".lx-popup-inside a .fa-caret-right", ".lx-popup").on("click",function() {
    // test if the current picture is equal to the number pictures or not
    if (currentpic === nbpics) {
        currentpic = 1;
    } else {
        currentpic = parseInt(currentpic) + 1;
    }
    // transmit information to the popup
    popupImg.attr("src", $(".lx-projects-item[data='" + currentpic + "'] img", ".lx-projects").attr("src"));
    popupTitle.text($(".lx-projects-item[data='" + currentpic + "'] h4", ".lx-projects").text());
    pupupCpic.text(currentpic + " of " + nbpics);
    return false;
});

// popup remove click event
$(".lx-popup-inside a .lnr-cross", ".lx-popup").on("click",function() {
    // hide popup
    popup.css("display", "none");
	popupImg.css("transform", "scale(0.5)");
    return false;
});

// Hide the popup when esc key is clicked
$(document).on("keyup", function(e) {
    if (e.keyCode === 27 || e.keyCode === 13) {
        // hide popup
        popup.css("display", "none");
		popupImg.css("transform", "scale(0.5)");
    }
    if (e.keyCode === 37) {
        $(".lx-popup-inside a .fa-caret-left").trigger("click");
    }	
	if (e.keyCode === 39) {
        $(".lx-popup-inside a .fa-caret-right").trigger("click");
    }	
    return false;
});

$("body").on("mouseup",function (e){
	var bloc = $(".lx-popup-inside *");
	if (!bloc.is(e.target)){
        popup.css("display", "none");
		popupImg.css("transform", "scale(0.5)");
	}
});

// search-plus click event
$("a .fa-search-plus", ".lx-projects").on("click",function(event) {
    // stop hide popup event
    event.stopPropagation();
    return false;
});

// arrows click event
$(".lx-popup-content,.lx-popup-inside a .fa-caret-left,.lx-popup-inside a .fa-caret-right", ".lx-popup").on("click",function(event) {
    // stop hide popup event
    event.stopPropagation();
    return false;
});