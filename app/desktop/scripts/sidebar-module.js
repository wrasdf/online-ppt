App.module("SidebarModule.test", function(){
	this.test = function(){
		console.log("sidebar 1111 test");
	}
});


App.module("SidebarModule.data", function(){
	this.data = function(){
		console.log("sidebar submodule data");
	}
});

App.module("SidebarModule", function(){

	var self = this;

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

	this.addInitializer(function(){
		self.test.test();
		self.data.data();
		AppLayoutView.nav.show(new navCollectionView({
			collection: data
		}));
	});

});

App.module("SidebarModule").on("before:start", function(){
  console.log("SidebarModule before start");
});

App.module("SidebarModule").on("start", function(){
  console.log("SidebarModule start");
});
