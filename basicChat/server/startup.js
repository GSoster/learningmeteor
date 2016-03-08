Meteor.startup(function () {
        if (Messages.find().count() === 0) {
            Messages.insert({
                message: "ola",
                createdAt: new Date()
            });
        }
    });
