  Template.formSendMessage.events({
      "submit form": function (event, template) {
          event.preventDefault();
          var message = template.find('.sendMessage').value;
          if (Meteor.user()) {
              Messages.insert({
                  message: message,
                  createdOn: new Date(),
                  createdBy: Meteor.user()._id
              });
          } else {
              alert("Você precisa estar logado para postar!");
          }
      }
  });