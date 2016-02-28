Messages = new Mongo.Collection("messages");
if (Meteor.isClient) {

    var mesage_data = [{
        message: "ola!"
    }, {
        message: "first post!"
    }];

    Template.messages.helpers({
        messages: function () {
            return Messages.find();
        }
    });



    Template.formSendMessage.events({
        "submit form": function (event, template) {
            event.preventDefault();
            alert("ok!");
            var message = template.find('.sendMessage').value;
            Messages.insert({
                message: message,
                createdAt: new Date()
            });
        }
    });

}

if (Meteor.isServer) {
    Meteor.startup(function () {
        if (Messages.find().count() === 0) {
            Messages.insert({
                message: "ola",
                createdAt: new Date()
            });
        }
    });
}