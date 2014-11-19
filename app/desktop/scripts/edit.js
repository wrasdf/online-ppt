"use strict";

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

// how to make it execute ?
// App.on('initialize:before', function(options) {
// 	console.log("before Initialization");
// });

// App.on('initialize:after', function(options) {
// 	console.log('Initialization Finished');
// });

App.on('start', function(options) {
  	Backbone.history.start({pushState: true});
});


App.module("AppLayoutModule", function(){

	this.init = function(){
		App.mainRegion.show(AppLayoutView);
	}

});


App.module("SidebarModule", function(){

	var navItemView = Backbone.Marionette.ItemView.extend({
		template: "#nav-item-view",
		tagName: 'li'
	});
	
	var navCollectionView = Backbone.Marionette.CompositeView.extend({
		template: "#nav-collection-view",
		childView: navItemView,
		childViewContainer: "ul"
	});

	var navItemModel = Backbone.Model.extend({});
	var navCollectionModel = Backbone.Collection.extend({
		model: navItemModel
	});


	var data = new navCollectionModel([
			new navItemModel({name: "test1", age: "asdfsd1"}),
			new navItemModel({name: "test2", age: "asdfsd2"}),
			new navItemModel({name: "test3", age: "asdfsd3"})
	]);

	this.init = function(){
		AppLayoutView.nav.show(new navCollectionView({
			collection: data
		}));
	}

});

App.module("SidebarModule.view", function(){
	this.test = function(){
		console.log("sidebar submodule test");
	}
});


App.module("SidebarModule.data", function(){
	this.data = function(){
		console.log("sidebar submodule data");
	}
});

$(function(){

	AppLayoutView = new layoutView();
	App.addInitializer(function(options){
		App.module("AppLayoutModule").init();
		App.module("SidebarModule").init();
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