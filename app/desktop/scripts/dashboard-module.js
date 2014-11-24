App.module("DashboardModule", function(){
	
	
	var dashboardModel, currentModelIndex = 0, controllerInstance;

	var itemModel = Backbone.Model.extend({
		defaults: {
            title: "",
			description: "",
			index: 0 			
        }
	});

	var controller = Backbone.Marionette.Controller.extend({
		initialize: function(){

			EventBus.on("dashboardContentUpdataByModel", function(data){
				currentModelIndex = data.index || currentModelIndex;
				dashboardModel.set({
					title: data.model.get("title"),
					description: data.model.get("description")
				});
			})

			var firstPPtData = pptData[0];
			dashboardModel = new itemModel(firstPPtData);
			AppLayoutView.dashboard.show(new dashboardView({
				model: dashboardModel
			}));

		},

		syncData: function(model){

			dashboardModel.set({
				title: $(".title-input").val(),
				description: $(".description-input").val()
			});

			EventBus.trigger("navModelUpdate", {
				index: currentModelIndex,
				model: model
			});
			
		}
	})

	var dashboardView = Backbone.Marionette.ItemView.extend({
		template: "#dashboard-item-view",
		model: itemModel,
		modelEvents: {
		    "change": "render"
		},
		events: {
		    'click .save': 'clickedButton'
		},
		clickedButton: function(){
			var self = this;
			controllerInstance.syncData(self.model);				
		}
	});	

	this.startWithParent = false;

	this.addInitializer(function(){
		controllerInstance = new controller();
	});

});