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
            setupCurrentDocument();
            return Session.get("docid");

        },
        config: function () {
            return function (editor) {
                editor.on('change', function (cm_editor, info) {
                    editor.setOption("lineNumbers", true);
                    editor.setOption("theme", 'the-matrix');
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

    Template.editingUsers.helpers({
        users: function () {
            var doc, eusers, users;
            doc = Documents.findOne();
            if (!doc) {
                return;
            }
            eusers = EditingUsers.findOne({
                docid: doc._id
            });
            if (!eusers) {
                return;
            }
            //has checked everything, can now proceed
            users = new Array();
            for (var user_id in eusers.users) {
                users.push(fixObjectKeys(eusers.users[user_id]));
            }


            return users;
        }

    });

    Template.navbar.helpers({
        documents: function () {
            return Documents.find({});
        }
    });

    Template.docMeta.helpers({
        document: function () {
            return Documents.findOne({
                _id: Session.get('docid')
            });
        }
    });

    Template.editableText.helpers({
        userCanEdit: function (doc, Collection) {
            //can edit if the current doc is owned by me
            doc = Documents.findOne({
                _id: Session.get("docid"),
                owner: Meteor.userId()
            });
            if (doc) {
                return true;
            }
            return false;
        }
    });


    /////
    // EVENTS
    /////
    Template.navbar.events({
        'click .js-load-doc': function (event) {
            event.preventDefault();
            Session.set('docid', this._id);
        },

        'click .js-add-doc': function (event) {
            event.preventDefault();
            console.log('added doc');
            if (!Meteor.user()) {
                alert("You need to log in first.");
            } else {
                //insert doc
                var id = Meteor.call("addDoc", function (err, result) {
                    if (!err) { //no error
                        console.log("event callback received id: " + result);
                        Session.set("docid", result);
                    }
                }); //method with a callback function (because it is asynchronous)                
            }

        }
    });

} // /Meteor.isClient

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
    addDoc: function () {
        if (!this.userId) {
            return; //if user is not logged in 
        }
        doc = {
            owner: this.userId,
            createdOn: new Date(),
            title: 'my new doc'
        };
        var id = Documents.insert(doc); //by default after a insertion the id of the new documents inserted is returned        
        console.log("new Doc id is: " + id);
        return id;
    },
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

///////// 
/// FUNCTIONS
////////
function setupCurrentDocument() {
    var doc;
    if (!Session.get('docid')) { //no doc id set yet
        doc = Documents.findOne();
        if (doc) {
            Session.set("docid", doc._id);
        }
    }
}


function fixObjectKeys(obj) {
    var newObj = {};
    for (key in obj) {
        var key2 = key.replace("-", "");
        newObj[key2] = obj[key];
    }
    return newObj;
}