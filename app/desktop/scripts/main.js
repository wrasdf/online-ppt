"use strict";

// how to make it execute ?
// App.on('initialize:before', function(options) {
// 	console.log("before Initialization");
// });

// App.on('initialize:after', function(options) {
// 	console.log('Initialization Finished');
// });

$(function(){
	AppLayoutView = new layoutView();
	App.addInitializer(function(options){
		App.module("AppLayoutModule").start();
		App.module("SidebarModule").start();
		App.module("DashboardModule").start();		
	});
	App.start();
});


// $("#convert").bind("click", function(){
// 	var test = $(".test");
// 	test.css("display","block");
// 	html2canvas($(".test"), {
// 	    onrendered: function(canvas) {
// 	        var t = document.body.appendChild(canvas);
// 	        $(t).width(150).height(150);
// 	        test.css("display","none");
// 	    }
// 	});
// });