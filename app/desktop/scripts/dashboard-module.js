App.module("DashboardModule", function(){
	
	var dashboardItemModel = Backbone.Model.extend({
		defaults: {
            title: "",
			description: ""			
        }
	});

	var dashboardView = Backbone.Marionette.ItemView.extend({
		template: "#dashboard-item-view",
		model: dashboardItemModel,
		modelEvents: {
		    "change": "modelChanged"
		},
		events: {
		    'click .save': 'clickedButton'
		},
		clickedButton: function(){
			var self = this;
			self.model.set({
				title: $(".title-input").val(),
				description: $(".description-input").val()
			});
		},
		modelChanged: function(){
			var self = this;
			EventBus.trigger("navModelUpdate", {
				index: 1,
				model: {
					title: self.model.get("title"),
					description: self.model.get("description")
				}
			});
		}
	});

	this.addInitializer(function(){
		AppLayoutView.dashboard.show(new dashboardView({
			model: new dashboardItemModel()	
		}));
	});

});