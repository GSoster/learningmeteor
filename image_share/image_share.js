    if (Meteor.isClient) {
        console.log("I am the client");

        var img_data = [
            {
                img_src: "image.jpg",
                img_alt: "graphics"
            },
            {
                img_src: "image.jpg",
                img_alt: "graphics"
            },
            {
                img_src: "image.jpg",
                img_alt: "graphics"
            }
        ];



        Template.images.helpers({
            images: img_data
        });


        Template.images.events({
            'click .js-image': function (event) {
                alert(event.pageY);
                console.log(event);
            }
        });

    }






    if (Meteor.isServer) {
        console.log("I am the server");
        Meteor.startup(function () {
            // code to run on server at startup
        });
    }
