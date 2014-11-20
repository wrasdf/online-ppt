App.module("SidebarModule", function(){

	var self = this;

	var navItemView = Backbone.Marionette.ItemView.extend({
		template: "#nav-item-view",
		tagName: 'li',
		events : {
			'click': 'changeDashboardContent'
		},
		changeDashboardContent: function(){
			EventBus.trigger("dashboardContentUpdataByModel", this.model);
		}
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
			description: "asdfsd1",
			index: 0
		}
	});
	var navCollection = Backbone.Collection.extend({
		model: navItemModel
	});	

	var navCollectionInstance = new navCollection();

	EventBus.on("navModelUpdate", function(data){		
		var updateModel = navCollectionInstance.at(data.index).set({
			index : data.index,
			title : data.title,
			description: data.description
		});
	});

	this.addInitializer(function(){
		$.each(pptData, function(i, item){
			navCollectionInstance.add(new navItemModel($.extend(item, {index: i})));
		});
		AppLayoutView.nav.show(new navCollectionView({
			collection: navCollectionInstance
		}));		
	});
});

// App.module("SidebarModule").on("before:start", function(){
  
// });

// App.module("SidebarModule").on("start", function(){
  
// });
