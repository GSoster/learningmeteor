Messages = new Mongo.Collection("messages");


//security
Messages.allow({
    insert: function (userId, doc) {
        if (doc.hasOwnProperty('createdBy') && doc.hasOwnProperty('message') && doc.hasOwnProperty('createdOn')) {
            if (doc.createdBy === userId) {
                return true;
            }
        }
        return false;
    }
});