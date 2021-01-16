// Strict Mode
"use strict";

// Windows load event
$(window).on("load", function() {
	// Loader Fade Out
	$(".lx-loader", ".lx-wrapper").fadeOut();
	return false;
});

$(document).on("ready", function() {

	// Set body background
	$("body").css({"background":$(".lx-wrapper").attr("data-background-color")+" url('"+$(".lx-wrapper").attr("data-background")+"') no-repeat center center fixed","background-size":"cover"});

	// Resize home and content blocs
	$(".lx-home").css("height",$(".lx-wrapper").height()+"px");
	$(".lx-blocs-content").css("max-height",($(".lx-wrapper").height()-100)+"px");
	if($(window).width() <= 768){
		$(".lx-blocs-content").css("max-height",($(".lx-wrapper").height()-42)+"px");
	}

	// SlideShow background if it does exist
	if($(".lx-slideshow-background").length){
		for (var i = 0; i < $(".lx-slideshow-img", ".lx-slideshow-background").length; i++) {
			$(".lx-slideshow-img:eq(" + i + ")").css({"background":"url('"+$(".lx-slideshow-img:eq(" + i + ") img").attr("src")+"') no-repeat center center fixed","background-size":"cover"});
			$(".lx-slideshow-img:eq(" + i + ") img").remove();
		}

		var i = 0;
		window.setInterval(function(){
			$(".lx-slideshow-img").not(":eq(" + i + ")").fadeOut();
			$(".lx-slideshow-img:eq(" + i + ")").fadeIn();
			i += 1;
			if(i === 3){
				i = 0;
			}
		},4000);
	}

	// Set Months
	var month = new Array();
	month[0] = "Januvery";
	month[1] = "Febriery";
	month[2] = "March";
	month[3] = "April";
	month[4] = "May";
	month[5] = "June";
	month[6] = "July";
	month[7] = "اAugest";
	month[8] = "September";
	month[9] = "October";
	month[10] = "November";
	month[11] = "Desember";

	// Get Current Date
	var lx_date = new Date();
	$(".lx-day").text(lx_date.getDate());
	$(".lx-month").text(month[lx_date.getMonth()]);
	$(".lx-year").text(lx_date.getFullYear());
	$(".lx-time").text(lx_date.getHours()+":"+lx_date.getMinutes()+":"+lx_date.getSeconds());

	// Retreive Time
	window.setInterval(function(){
		var lx_date = new Date();
		$(".lx-time").text(lx_date.getHours()+":"+lx_date.getMinutes()+":"+lx_date.getSeconds());
	},1000);

	var patt = /single-post/;
	if(!patt.test(location.pathname)){
		// Redirection to the requested bloc
		hashHistory();
	}

	return false;
});

// URI Hash event
$(window).on("hashchange", function() {
	// Redirection to the requested bloc
	hashHistory();
	return false;
});

// Hash event
function hashHistory() {

	// Retreive Hash
	var page = "";
	if (window.location.hash) {
		page = document.location.hash;
		page = page.replace(/\#/, "");
	} else {
		page = "home";
	}
	// Remove active class from menus
	$(".lx-main-menu ul li a").removeClass("active");
	// Set clicked menu active
	$(".lx-main-menu ul li a[data-url='" + page + "']").addClass("active");
	// Hide all blocs
	$(".lx-blocs").removeClass("active");
	// Show the correspondant bloc
	$(".lx-"+page).addClass("active");
	// If bloc skills load the progress bars
	if(page === "skills"){
		for (var i = 0; i < $(".lx-bar", ".lx-bars-chart").length; i++) {
			$(".lx-bar:eq(" + i + ") .lx-bar-counter").text($(".lx-bar:eq(" + i + ")").attr("data-max") + "%");
			$(".lx-bar:eq(" + i + ") .lx-bar-fill").css("width", $(".lx-bar:eq(" + i + ")").attr("data-max") + "%");
		}
	}
	else{
		for (var i = 0; i < $(".lx-bar", ".lx-bars-chart").length; i++) {
			$(".lx-bar:eq(" + i + ") .lx-bar-counter").text("0%");
			$(".lx-bar:eq(" + i + ") .lx-bar-fill").css("width","0%");
		}
	}
}

// Main menu event : show correspondant section
$(".lx-main-menu ul li a").on("click", function() {

	var patt = /single-post/;
	if(!patt.test(location.pathname)){
		// Remove active class from menus
		$(".lx-main-menu ul li a").removeClass("active");
		// Set clicked menu active
		$(this).addClass("active");
		// Hide all blocs
		$(".lx-blocs").removeClass("active");
		// Show the correspondant bloc
		$("."+$(this).attr("data-title")).addClass("active");
		// Update the url
		history.pushState('data', '', $(this).attr("data-url"));

		// If bloc skills load the progress bars
		if($(this).attr("data-title") === "lx-skills"){
			for (var i = 0; i < $(".lx-bar", ".lx-bars-chart").length; i++) {
				$(".lx-bar:eq(" + i + ") .lx-bar-counter").text($(".lx-bar:eq(" + i + ")").attr("data-max") + "%");
				$(".lx-bar:eq(" + i + ") .lx-bar-fill").css("width", $(".lx-bar:eq(" + i + ")").attr("data-max") + "%");
			}
		}
		else{
			for (var i = 0; i < $(".lx-bar", ".lx-bars-chart").length; i++) {
				$(".lx-bar:eq(" + i + ") .lx-bar-counter").text("0%");
				$(".lx-bar:eq(" + i + ") .lx-bar-fill").css("width","0%");
			}
		}

		// Responsive Menu Hide
		if($(window).width() <= 768){
			$(".lx-main-menu").css("left", "-116px");
			$(".lx-main-menu > i").attr("class", "lnr lnr-menu");
		}
	}
});

// Responsive menu event
$(".lx-main-menu > i").on("click", function() {
	if ($(".lx-main-menu").css("left") === "-116px") {
		$(".lx-main-menu").css("left", "0px");
		$(".lx-main-menu > i").attr("class", "lnr lnr-cross");
	} else {
		$(".lx-main-menu").css("left", "-116px");
		$(".lx-main-menu > i").attr("class", "lnr lnr-menu");
	}
	return false;
});

// Hide window
$(".lx-blocs-head ul li a i.lnr-cross").on("click", function() {

	// Remove active class from menus
	$(".lx-main-menu ul li a").removeClass("active");
	$(".lx-main-menu ul li a[data-title='lx-home']").addClass("active");

	// Remove active class from the closed bloc
	$(this).parent().parent().parent().parent().parent().removeClass("active");

	history.pushState('data', '', '#home');

	// Empty the progress bars if it is the skills bloc
	if($(this).parent().parent().parent().parent().parent().attr("class") === "lx-skills lx-blocs"){
		for (var i = 0; i < $(".lx-bar", ".lx-bars-chart").length; i++) {
			$(".lx-bar:eq(" + i + ") .lx-bar-counter").text("0%");
			$(".lx-bar:eq(" + i + ") .lx-bar-fill").css("width","0%");
		}
	}

	// Contract the form the bloc if it is expanded
	if($(this).parent().parent().parent().find(".lnr-frame-contract").length){
		$(this).parent().parent().parent().find(".lnr-frame-contract").attr("class","lnr lnr-frame-expand");
		$(this).parent().parent().parent().parent().parent().attr("style","");
	}

	return false;
});

// Expand and Contract window
$(".lx-blocs-head ul li a").on("click", function() {

	if($(this).find("i").attr("class") === "lnr lnr-frame-expand"){
		$(this).find("i").attr("class","lnr lnr-frame-contract");
		$(this).parent().parent().parent().parent().css({"position":"fixed","z-index":"10","top":"0px","left":"0px","height":"100%"});
		$(this).parent().parent().parent().next("div").css("max-height",($(".lx-wrapper").height()-42)+"px");
	}
	else{
		$(this).find("i").attr("class","lnr lnr-frame-expand");
		$(this).parent().parent().parent().parent().attr("style","");
		if($(window).width() <= 768){
			$(this).parent().parent().parent().next("div").css("max-height",($(".lx-wrapper").height()-42)+"px");
		}
		else{
			$(this).parent().parent().parent().next("div").css("max-height",($(".lx-wrapper").height()-100)+"px");
		}
	}
	return false;
});

// Contact Form Errors
$(".lx-contact form input[type='button']").on("click", function() {
	// Remove all errors
	$(".lx-contact form span").remove();
	$(".lx-contact form input[type='text']").css("border-right", "0px");
	$(".lx-contact form textarea").css("border-right", "0px");
	// Test fullname
	var fullname = $(".lx-contact form input[name='fullname']");
	if (fullname.val() === "") {
		fullname.after("<span>This field must be filled</span>").css("border-right", "3px solid #a94442");
	}
	// Test email
	var email = $(".lx-contact form input[name='email']");
	var patt = /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
	if (!patt.test(email.val())) {
		email.after("<span>Invalid Email</span>").css("border-right", "3px solid #a94442");
	}
	// Test message
	var txtarea = $(".lx-contact form textarea");
	if (txtarea.val() === "") {
		txtarea.after("<span>This field must be filled</span>").css("border-right", "3px solid #a94442");
	}

	if($(".lx-contact form span").length === 0){
		var url = "send-contact-form.php?fullname="+fullname.val()+"&email="+email.val()+"&message="+txtarea.val();
		var posting = $.post( url );
		posting.done(function( data ) {
			$(".lx-contact-saved").html(data);
			$(".lx-contact form input[name='fullname']").val("");
			$(".lx-contact form input[name='email']").val("");
			$(".lx-contact form textarea").val("");
		});
	}
	return false;
});

// Remove email error
$(".lx-contact form input[name='email']").on("keyup", function() {
	var patt = /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
	if (patt.test($(this).val())) {
		$(this).css("border-right", "0px").next("span").remove();
	}
	return false;
});

// Remove fullname error
$(".lx-contact form input[name='fullname']").on("keyup", function() {
	if ($(this).val() !== "") {
		$(this).css("border-right", "0px").next("span").remove();
	}
	return false;
});

// Remove textarea error
$(".lx-contact form textarea").on("keyup", function() {
	if ($(this).val() !== "") {
		$(this).css("border-right", "0px").next("span").remove();
	}
	return false;
});

// Comment Form Errors
$(".lx-comments-form input[type='button']").on("click",function(){

	$(".lx-comments-form input[type='text']").css("border-color","#FF0000");
	$(".lx-comments-form textarea").css("border-color","#FF0000");

	// Test fullname input
	var fullname = $(".lx-comments-form input[name='fullname']");
	if(fullname.val() !== ""){
		fullname.css("border-color","#EEEEEE");
	}

	// Test message input
	var txtarea = $(".lx-comments-form textarea");
	if(txtarea.val() !== ""){
		txtarea.css("border-color","#EEEEEE");
	}

	return false;
});

// Remove Errors
$(".lx-comments-form input[name='fullname']").on("keyup",function(){
	if($(this).val() !== ""){
		$(this).css("border-color","#EEEEEE");
	}

	return false;
});

$(".lx-comments-form textarea").on("keyup",function(){
	if($(this).val() !== ""){
		$(this).css("border-color","#EEEEEE");
	}

	return false;
});