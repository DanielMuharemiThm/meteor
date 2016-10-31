if (Meteor.isServer) {
    Meteor.publish("userList", function () {
        return Meteor.users.find({}, { fields: { emails: 1, profile: 1 } });
    });
    Meteor.publish("profile", function () {
        return Meteor.users.find({_id: Meteor.user._id}, { fields: { emails: 1, profile: 1 } });
    });
}
