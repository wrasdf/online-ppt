"use strict";

var App = new Backbone.Marionette.Application();

App.addRegions({
	mainRegion: ".wrapper"
});

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
	template: "#navItemView",
	tagName: 'li'
});


App.views.navCollectionView = Backbone.Marionette.CompositeView.extend({
	tagName: "ul",
	itemView: App.views.navItemView, 
	appendHtml: function(collectionView, itemView){
		collectionView.append(itemView.el);
	}	
});



App.models.navItem = Backbone.Model.extend({});

App.collections.navCollection = Backbone.Collection.extend([
		new App.models.navItem({name: "test1", age: "asdfsd1"}),
		new App.models.navItem({name: "test2", age: "asdfsd2"}),
		new App.models.navItem({name: "test3", age: "asdfsd3"}),
]);



$(function(){

	App.addInitializer(function(options){
		var AppLayoutView = new App.layouts.rootView(); 
		App.mainRegion.show(AppLayoutView);
		

		// console.log(AppLayoutView.nav.show)
		console.log(new App.collections.navCollection())
		console.log(new App.views.navCollectionView({
			collection: new App.collections.navCollection()
		}));


		// App.views.navCollectionView({
		// 	collection: new App.collections.navCollection()
		// })

		// console.log(AppLayoutView.nav.show(App.views.navCollectionView({
		// 	collection: new App.collections.navCollection()
		// })));

		// AppLayoutView.nav.show(new App.views.navCollectionView({
		// 	collection: new App.collections.navCollection()
		// }));

	});



	App.start();
	
})





// App.views.navCollectionView = Backbone.Marionette.CompositeView.extend({
// 	el: $(".wrapper > nav"),
// 	// tagName: "ul",
// 	template: "#navCollectionView",
// 	itemView: App.views.navItemView 
// 	// appendHtml: function(collectionView, itemView){
// 	// 	collectionView.append(itemView.el);
// 	// }	
// });




// var AngryCat = Backbone.Model.extend({

// });

// var AngryCats = Backbone.Collection.extend({
//     model: AngryCat
// });


// App.addInitializer(function(options){
// 	console.log(1);
// 	var angryCatsView = new App.views.navCollectionView({
// 		collection: options.navCollection
// 	});
// 	console.log(angryCatsView);
// 	console.log(App.mainRegion)
// 	App.mainRegion.show(angryCatsView);
// });



// $(function(){


// 	var cats = new AngryCats([
//         new AngryCat({ name: 'Vertical Mode', age: 'Swipe to the Top or to the Bottom' }),
//         new AngryCat({ name: 'Slide 2', age: 'Keep swiping' }),
//         new AngryCat({ name: 'Slide 3', age: 'The last one' })
//     ]);

// 	App.start({
// 		navCollection : cats
// 	});


//  //  	App.start({navCollection: new Backbone.Collection.extend([
//  //    	{name: "test1", age: "124"},
// 	// 	{name: "test2", age: "12"},
// 	// 	{name: "test3", age: "12"}
// 	// ])});
	
// })



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