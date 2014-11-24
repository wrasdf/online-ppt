App.module("LoginModule", function(){
	
	var controllerInstance;
	
	var view = Backbone.Marionette.ItemView.extend({
		template: "#login-view"
	});

	var controller = Backbone.Marionette.Controller.extend({		
		appendView : function(){
			AppLayoutView.loginContent.show(new view());	
		}
	});

	this.startWithParent = false;

	this.addInitializer(function(){	
		
		controllerInstance = new controller();

		App.Router.processAppRoutes(controllerInstance, {
		  "login": "appendView"
		});

	});

});

