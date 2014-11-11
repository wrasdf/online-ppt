"use strict";

$("#convert").bind("click", function(){
	html2canvas($(".test"), {
    onrendered: function(canvas) {
        var t = document.body.appendChild(canvas);
        $(t).width(150).height(150);
    }
});
})