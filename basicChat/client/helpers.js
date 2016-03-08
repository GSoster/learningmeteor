   Accounts.ui.config({
       passwordSignupFields: "USERNAME_AND_EMAIL"
   });


   Template.messages.helpers({
       messages: function () {
           return Messages.find();
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