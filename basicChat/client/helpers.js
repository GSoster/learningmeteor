   Accounts.ui.config({
       passwordSignupFields: "USERNAME_AND_EMAIL"
   });


   Template.messages.helpers({
       messages: function () {
           return Messages.find({}, {
               sort: {
                   createdOn: -1
               }
           });
       },
       getUser: function (userId) {
           var user = Meteor.users.findOne({
               _id: userId
           });
           if (user) {
               return user.username;
           }
           return 'anonimo';
       }
   });