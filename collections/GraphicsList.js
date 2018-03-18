GraphicsList = new Mongo.Collection('graphics');

if (Meteor.isServer) {
    GraphicsList.allow({
        'insert': function (userId, doc) {
            return true; 
        },
        'remove': function(userId, doc){
            return true;
        }
    });
} else {
    console.log("Initialisation des graphes", GraphicsList.find().fetch());
}