"use strict";

var App = new Backbone.Marionette.Application();

App.addRegions({
	mainRegion: ".wrapper"
});

// how to make it execute ???
// App.on('initialize:before', function(options) {
// 	console.log("before Initialization");
// });

// App.on('initialize:after', function(options) {
// 	console.log('Initialization Finished');
// });

App.on('start', function(options) {
  	Backbone.history.start({pushState: true});
});


App.collections = {};
App.models = {};
App.views = {};
App.layouts = {};


App.layouts.rootView = Backbone.Marionette.LayoutView.extend({
  template: "#layout-view-template",
  regions: {
    nav: "#nav",
    dashboard: "#dashboard"
  }
});


App.views.navItemView = Backbone.Marionette.ItemView.extend({
	template: "#nav-item-view",
	tagName: 'li'
});


App.views.navCollectionView = Backbone.Marionette.CompositeView.extend({
	template: "#nav-collection-view",
	childView: App.views.navItemView,
	childViewContainer: "ul"
});

App.models.navItem = Backbone.Model.extend({});

App.collections.navCollection = Backbone.Collection.extend({
	model: App.models.navItem
});


$(function(){

	App.addInitializer(function(options){

		var AppLayoutView = new App.layouts.rootView(); 
		App.mainRegion.show(AppLayoutView);

		AppLayoutView.nav.show(new App.views.navCollectionView({
			collection: options.navCollection
		}));

	});

	var appViewNavCollection = new App.collections.navCollection([
				new App.models.navItem({name: "test1", age: "asdfsd1"}),
				new App.models.navItem({name: "test2", age: "asdfsd2"}),
				new App.models.navItem({name: "test3", age: "asdfsd3"})
		]);

	App.start({
		navCollection : appViewNavCollection
	});
	
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