this.Documents = new Mongo.Collection("documents");//this so the package sharejs can use it.



if (Meteor.isClient) {
    
    
    //Update the current time in the session
    //every 1 second
    Meteor.setInterval(function(){
        Session.set('current_date', new Date());
    }, 1000);
    
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
            return Session.get('current_date');
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
