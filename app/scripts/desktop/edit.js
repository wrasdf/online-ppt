"use strict";

$("#convert").bind("click", function(){
	var test = $(".test");
	test.css("display","block");
	html2canvas($(".test"), {
	    onrendered: function(canvas) {
	        var t = document.body.appendChild(canvas);
	        $(t).width(150).height(150);
	        test.css("display","none");
	    }
	});
});