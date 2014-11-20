App.module("DashboardModule", function(){
	
	var itemModel = Backbone.Model.extend({
		defaults: {
            title: "",
			description: "",
			index: 0 			
        }
	});
	var dashboardModel;

	EventBus.on("dashboardContentUpdataByModel", function(model){
		dashboardModel.set({
			title: model.get("title"),
			description: model.get("description"),
			index: model.get("index")
		});
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
			EventBus.trigger("navModelUpdate", {
				index: this.model.get("index"),
				title: $(".title-input").val(),
				description: $(".description-input").val()
			});
		}
	});	

	this.addInitializer(function(){
		var firstPPtData = pptData[0];
		 dashboardModel = new itemModel(firstPPtData);
		AppLayoutView.dashboard.show(new dashboardView({
			model: dashboardModel
		}));
	});

});