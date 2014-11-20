App.module("SidebarModule", function(){

	var self = this;

	var navItemView = Backbone.Marionette.ItemView.extend({
		template: "#nav-item-view",
		tagName: 'li'
	});
	
	var navCollectionView = Backbone.Marionette.CompositeView.extend({
		template: "#nav-collection-view",
		childView: navItemView,
		childViewContainer: "ul",
		collectionEvents: {
			"change": "render"
		}
	});

	var navItemModel = Backbone.Model.extend({
		default: {
			title: "title1", 
			description: "asdfsd1"
		}
	});
	var navCollection = Backbone.Collection.extend({
		model: navItemModel
	});	

	var navCollectionInstance = new navCollection();

	EventBus.on("navModelUpdate", function(data){		
		var updateModel = navCollectionInstance.at(data.index).set({
			title : data.model.title,
			description: data.model.description
		});
	});

	this.addInitializer(function(){
		navCollectionInstance.add(new navItemModel({title: "title1", description: "asdfsd1"}));
		navCollectionInstance.add(new navItemModel({title: "title2", description: "asdfsd1"}));
		navCollectionInstance.add(new navItemModel({title: "title3", description: "asdfsd1"}));
		AppLayoutView.nav.show(new navCollectionView({
			collection: navCollectionInstance
		}));		
	});

});

// App.module("SidebarModule").on("before:start", function(){
  
// });

// App.module("SidebarModule").on("start", function(){
  
// });
