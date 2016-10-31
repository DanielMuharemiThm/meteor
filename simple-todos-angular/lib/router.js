Router.route('/', function () {
  this.render('signin');
});

Router.route('content', {
  path: 'content',
  onBeforeAction: function() {
    Meteor.subscribe("userList");
    this.render('content');
  },
  data: function(){
      return Meteor.users.find({}, {fields: {emails: 1, profile: 1}});
  } 
});


Router.route('login');
Router.route('signin');
Router.route('join');