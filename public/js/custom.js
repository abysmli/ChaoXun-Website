$(function () {

	"use strict";

	// REMOVE # FROM URL
	$('a[href="#"]').click(function (e) {
		e.preventDefault();
	});

	// STICKY NAV
	//var stickyHeaderTop = $(window).height();
	var stickyHeaderTop = $("#main-header-wrap").height();
	$(window).scroll(function () {
		if ($(window).scrollTop() > stickyHeaderTop) {
			$("#main-menu-wrap").removeClass("static-nav");
			$("#main-menu-wrap").addClass("sticky-nav");
		} else {
			$("#main-menu-wrap").removeClass("sticky-nav");
			$("#main-menu-wrap").addClass("static-nav");
		}
	});

	// ONE PAGE NAV
	$("#nav").onePageNav({
		currentClass: 'current',
		changeHash: false,
		scrollSpeed: 750,
		scrollThreshold: 0.5,
		filter: '',
		easing: 'swing',
		begin: function () {
			//I get fired when the animation is starting
		},
		end: function () {
			//I get fired when the animation is ending
		},
		scrollChange: function ($currentListItem) {
			//I get fired when you enter a section and I pass the list item of the section
		}
	});

	// COUNTER
	function count($this) {
		var current = parseInt($this.html(), 10);
		$this.html(++current);
		if (current !== $this.data('count')) {
			setTimeout(function () { count($this) }, 50);
		}
	}
	$(".badges-counter").each(function () {
		$(this).data('count', parseInt($(this).html(), 10));
		$(this).html('0');
		count($(this));
	});

	// Blog Carousel
	$("#blog-post-carousel").owlCarousel({
		autoPlay: true, //Set AutoPlay to 3 seconds
		items: 3,
		stopOnHover: true,
		navigation: true, // Show next and prev buttons
		pagination: false,
		navigationText: ["<span class='fa fa-angle-left animation'></span>", "<span class='fa fa-angle-right animation'></span>"]
	});

	// Team Carousel
	$("#team-carousel").owlCarousel({
		autoPlay: true, //Set AutoPlay to 3 seconds
		items: 4,
		stopOnHover: true,
		navigation: true, // Show next and prev buttons
		pagination: false,
		navigationText: ["<span class='fa fa-angle-left animation'></span>", "<span class='fa fa-angle-right animation'></span>"]
	});

	// ACCORDION
	var $active = $("#accordion .panel-collapse.in")
		.prev()
		.addClass("active");

	$active
		.find("a")
		.append("<span class=\"fa fa-angle-up pull-right\"></span>");

	$("#accordion .panel-heading")
		.not($active)
		.find('a')
		.prepend("<span class=\"fa fa-angle-down pull-right\"></span>");

	$("#accordion").on("show.bs.collapse", function (e) {
		$("#accordion .panel-heading.active")
			.removeClass("active")
			.find(".fa")
			.toggleClass("fa-angle-down fa-angle-up");
		$(e.target)
			.prev()
			.addClass("active")
			.find(".fa")
			.toggleClass("fa-angle-down fa-angle-up");
	});

	$("#accordion").on("hide.bs.collapse", function (e) {
		$(e.target)
			.prev()
			.removeClass("active")
			.find(".fa")
			.removeClass("fa-angle-up")
			.addClass("fa-angle-down");
	});

	//MAGNIFIC POPUP
	$('.portfolio-item').magnificPopup({
		delegate: 'a.zoom',
		type: 'image',
		gallery: {
			enabled: true
		}
	});

	//AJAX CONTACT FORM
	$(".contact-form").submit(function () {
		var rd = this;
		var url = "/"; // the script where you handle the form input.
		$.ajax({
			type: "POST",
			url: url,
			data: $(".contact-form").serialize(), // serializes the form's elements.
			success: function (data) {
				//alert("Mail sent!"); // show response from the php script.
				$(rd).prev().text(data.message).fadeIn().delay(3000).fadeOut();
			}
		});
		return false; // avoid to execute the actual submit of the form.
	});

	// GOOGLE MAP
	$(".map").height(400);
	function initialize($) {
		var mapOptions = {
			zoom: 15,
			center: new google.maps.LatLng(31.210037, 121.587851),
			disableDefaultUI: true
		};
		var map = new google.maps.Map(document.querySelector('.map'), mapOptions);
	}
	google.maps.event.addDomListener(window, 'load', initialize);

});