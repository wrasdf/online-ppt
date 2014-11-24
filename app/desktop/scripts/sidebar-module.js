App.module("SidebarModule", function(){

	var self = this, controllerInstance;

	var navItemView = Backbone.Marionette.ItemView.extend({
		template: "#nav-item-view",
		tagName: 'li',
		events : {
			'click': 'changeDashboardContent'
		},
		changeDashboardContent: function(){
			controllerInstance.updataDashboardContent();
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

	var controller = Backbone.Marionette.Controller.extend({

		initialize: function(){

			var navCollectionInstance = new navCollection();

			$.each(pptData, function(i, item){
				navCollectionInstance.add(new navItemModel(item));
			});			

			AppLayoutView.nav.show(new navCollectionView({
				collection: navCollectionInstance
			}));	

			this.listens();	

		},

		listens: function(){

			EventBus.on("navModelUpdate", function(data){		
				var updateModel = navCollectionInstance.at(data.index).set({
					title : data.model.get("title"),
					description: data.model.get("description")
				});
			});		

		},

		updataDashboardContent: function(){

			EventBus.trigger("dashboardContentUpdataByModel", {
				index: navCollectionInstance.indexOf(this.model),
				model : this.model
			});
		}

	});

	this.addInitializer(function(){
		controllerInstance = new controller();
	});

});

// App.module("SidebarModule").on("before:start", function(){
  
// });

// App.module("SidebarModule").on("start", function(){
  
// });
