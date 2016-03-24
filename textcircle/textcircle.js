this.Documents = new Mongo.collection("documents");//this so the package sharejs can use it.

if (Meteor.isClient) {



}

if (Meteor.isServer) {
    Meteor.startup(function () {
        if (!Documents.findOne()) {
            Documents.insert({title: 'my new content'});
        }
    });
}
