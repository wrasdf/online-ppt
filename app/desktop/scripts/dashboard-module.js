App.module("DashboardModule", function(){
	
	var itemModel = Backbone.Model.extend({
		defaults: {
            title: "",
			description: "",
			index: 0 			
        }
	});
	var dashboardModel, currentModelIndex;

	EventBus.on("dashboardContentUpdataByModel", function(data){
		currentModelIndex = data.index;
		dashboardModel.set({
			title: data.model.get("title"),
			description: data.model.get("description")
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

			dashboardModel.set({
				title: $(".title-input").val(),
				description: $(".description-input").val()
			});

			EventBus.trigger("navModelUpdate", {
				index: currentModelIndex,
				model: this.model
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