if (Meteor.isClient) {
	Template.content.helpers({
		emailLocalPart: function () {
			var admin = Roles.userIsInRole(Meteor.user()._id, 'admin', 'ALL');
			var bedienung = Roles.userIsInRole(Meteor.user()._id, 'bedienung', 'ALL');
			var kasse = Roles.userIsInRole(Meteor.user()._id, 'kasse', 'ALL');
			
			if (admin === true) {
				console.log("Ich darf alles!");
			}
			if (bedienung) {
				console.log("Ich darf bedienen!");
			}
			if (kasse) {
				console.log("Ich darf kassieren!");
			}

			var email = Meteor.user().emails[0].address;
			return email.substring(0, email.indexOf('@'));
		}/*,
		name: function () {
			console.log(Meteor.user().services);
			return Meteor.user().profile.name;
		}*/,
		showUsers: function () {
			return Meteor.subscribe("userList");
		}
	});

	Template.content.helpers({
		user: function () {
			
			var users = Meteor.users.find();
			
			return users;
		}
	});


	Template.content.helpers({
		userEmail: function () {
			return this.emails[0].address;
		}
	});

	Template.content.events({
		'click .js-logout': function () {
			Meteor.logout();
			Router.go('signin');
		}
	});
}

