var App = new Backbone.Marionette.Application();
var EventBus = new Backbone.Wreqr.EventAggregator();

var layoutView = Backbone.Marionette.LayoutView.extend({
	  template: "#layout-view-template",
	  regions: {
	    nav: "#nav",
	    dashboard: "#dashboard"
	  }
	});

var AppLayoutView;

App.addRegions({
	mainRegion: ".wrapper"
});

App.on('start', function(options) {
  	Backbone.history.start({pushState: true});
});

var pptData = [
	{title: "title1", description: "description1"},
	{title: "title2", description: "description2"},
	{title: "title3", description: "description3"}
];
