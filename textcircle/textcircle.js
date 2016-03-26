this.Documents = new Mongo.Collection("documents"); //'this' is used so the package sharejs can use it.
EditingUsers = new Mongo.Collection('editingUsers');


if (Meteor.isClient) {


    //Update the current time in the session
    //every 1 second
    Meteor.setInterval(function () {
        Session.set('current_date', new Date());
    }, 1000);

    Template.editor.helpers({
        docid: function () {
            var doc = Documents.findOne();
            if (doc) {
                return doc._id;
            }
            return undefined;
        },
        config: function () {
            return function (editor) {
                editor.on('change', function (cm_editor, info) {
                    console.log(cm_editor.getValue());
                    /*iframe has an entire html document inside it*/
                    /*we are getting it and additing what is in the editor*/
                    $('#viewer_ifrrame').contents().find("html").html(cm_editor.getValue());
                    Meteor.call('addEditingUser'); //calls the method 'addEditingUser'
                });
            }
        },
    });

    Template.date_display.helpers({
        current_date: function () {
            return Session.get('current_date');
        }
    });

}

if (Meteor.isServer) {
    Meteor.startup(function () {
        if (!Documents.findOne()) {
            Documents.insert({
                title: "my new content"
            });
        }
    });
}

Meteor.methods({
    addEditingUser: function () {
        var doc, user, eusers; //editing users
        doc = Documents.findOne();
        if (!doc) {
            return;
        } //there is no doc, stop action
        if (!this.userId) {
            return;
        } //no logged user
        //if there is a doc and a user:
        user = Meteor.user().profile;
        eusers = EditingUsers.findOne({
            docid: doc._id
        });
        if (!eusers) {
            eusers = {
                docid: doc._id,
                users: {},

            };
        }
        user.lastEdit = new Date();
        eusers.users[this.userId] = user;
        EditingUsers.upsert({
            _id: eusers._id
        }, eusers);
    }
});