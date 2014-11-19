App.module("AppLayoutModule", function(){
	this.addInitializer(function(){
		App.mainRegion.show(AppLayoutView);
	});

});