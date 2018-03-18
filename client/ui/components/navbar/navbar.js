import './navbar.html';
import '../../pages/home/home.html';
import $ from 'jquery';

Template.navbar.events({
    'click .navbar .menu_icon': function(){
        $('#sideBar').toggleClass("active");
        $('.overlay').toggleClass("active");
    },
    'click .overlay':function(){
        $('#sideBar').toggleClass("active");
        $('.overlay').toggleClass("active");
    },
    'click .graphName':function(evt,tmpl){
        var removeId = this._id;
        Meteor.call("deleteGraphics", removeId);
    },
    'click .submitGraph':function(evt, tmpl){
        var graphName = $("#name").val();
        var graphType = $("#type").val();
        var graphData = $("#data").val();
        Meteor.call("addGraphics", graphName, graphType, graphData);
        $('#addGraphique').modal('hide');
        $('#sideBar').toggleClass("active");
        $('.overlay').toggleClass("active");
    }
});

Template.navbar.helpers({
    graphs:function(){
        return GraphicsList.find();
    }
});