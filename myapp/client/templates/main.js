if (Meteor.isClient) {
	
	Template.main.helpers({
		image: function () {
			var facebookId = Meteor.user().services.facebook.id;
			return "graph.facebook.com/" + facebookId + "/picture/?type=large";
		}
	});

	Template.main.events({
		'click #logout': function (event) {
			Meteor.logout(function (err) {
				if (err) {
					throw new Meteor.Error("Logout failed");
				} else {
					Router.go('login');
				}
			})
		}
	});
}
