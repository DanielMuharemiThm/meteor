var ERRORS_KEY = 'joinErrors';

Template.join.rendered = function() {
  $('#bedienung').attr('checked', true);	
}

Template.join.onCreated(function() {
  Session.set(ERRORS_KEY, {});
});

Template.join.helpers({
  errorMessages: function() {
    return _.values(Session.get(ERRORS_KEY));
  },
  errorClass: function(key) {
    return Session.get(ERRORS_KEY)[key] && 'error';
  }
});

Template.join.events({
  'submit': function(event, template) {
    event.preventDefault();
    var email = template.$('[name=email]').val();
    var password = template.$('[name=password]').val();
    var confirm = template.$('[name=confirm]').val();
		
		var userGroupId = 'ALL';
		var userRole = [];
		if( $('#bedienung').prop('checked')) {
			userRole.push("bedienung");
		}
		if($('#kasse').prop('checked')) {
			userRole.push("kasse");
			userRole.push("bedienung");
		}
		if($('#admin').prop('checked')) {
			userRole.push("admin");
			userRole.push("kasse");
			userRole.push("bedienung");
		}
		
    var errors = {};

    if (! email) {
      errors.email = 'Email required';
    }

    if (! password) {
      errors.password = 'Password required';
    }

    if (confirm !== password) {
      errors.confirm = 'Please confirm your password';
    }

    Session.set(ERRORS_KEY, errors);
    if (_.keys(errors).length) {
      return;
    }
		
    Accounts.createUser({
      email: email,
      password: password
    }, function(error) {
      if (error) {
        return Session.set(ERRORS_KEY, {'none': error.reason});
      }else {
				Meteor.call("addRole", Meteor.user()._id, userRole, userGroupId);
			}      
    });
		
		Router.go('signin');
		
  }
});
