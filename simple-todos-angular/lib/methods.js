Meteor.methods({
	addRole: function (userId, userRole, userGroupId) {
		Roles.addUsersToRoles(userId, userRole, userGroupId);
	}
});