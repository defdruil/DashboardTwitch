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
		var i =0;
		var data;
		var datas = Array();
		while ($("#data_"+i).val() != undefined){
			data = $("#data_"+i).val();
			if (data != "none"){
				datas.push(data);
			}
		}
        Meteor.call("addGraphics", graphName, graphType, datas);
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