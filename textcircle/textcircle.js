this.Documents = new Mongo.Collection("documents");//this so the package sharejs can use it.

if (Meteor.isClient) {
    Template.editor.helpers({
        docid: function () {
            var doc = Documents.findOne();
            if (doc) {
                return doc._id;
            }
            return undefined;
        }
    });

    Template.date_display.helpers({
        current_date : function(){
            return new Date();
        }
    });

}

if (Meteor.isServer) {
    Meteor.startup(function () {
        if (!Documents.findOne()) {
            Documents.insert({title: "my new content"});
        }
    });
}
