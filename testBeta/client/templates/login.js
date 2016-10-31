if (Meteor.isClient) {
	Template.login.onRendered(function () {
	});	
	
	Template.login.events({
    'click #facebook-login': function (event) {
			Meteor.loginWithFacebook({}, function (err) {
				if (err) {
					throw new Meteor.Error("Facebook login failed");
				} else {
					Router.go('main');
				}
			});
    },
		'click #mail-login': function (event) {
			$("#form-login").toggle();
		}
	});	
}
