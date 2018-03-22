import './navbar.html';
import '../../pages/home/home.html';
import $ from 'jquery';
import { Template } from 'meteor/templating';

function getNewSelectId(){
	return "data_" + Template.instance().selectIds.get().length;
}

function addNewSelect(){
    var selectIds = Template.instance().selectIds.get();
    Template.instance().notEnoughSelects.set(false);
    if (selectIds.length < 10){
        selectIds.push({id: getNewSelectId()});
        Template.instance().selectIds.set(selectIds);
    } else {
        Template.instance().tooManySelects.set(true);
    }
}

function removeSelect(){
    var selectIds = Template.instance().selectIds.get();
    Template.instance().tooManySelects.set(false);
    if (selectIds.length > 2){
        selectIds.splice(selectIds.length -1, 1);
        Template.instance().selectIds.set(selectIds);
    } else {
        Template.instance().notEnoughSelects.set(true);
    }
}

Template.navbar.onCreated(function(){
    var self = this;
    this.type = new ReactiveVar("Jauge");
    this.selectIds = new ReactiveVar([]);
    this.missingName = new ReactiveVar(false);
    this.tooManySelects = new ReactiveVar(false);
    this.notEnoughSelects = new ReactiveVar(false);
    addNewSelect();
    this.selectOptions = new ReactiveVar([]);
    this.directValuesSelectOptions = [
        {value: "totalZombies", label: "label"},
        {value: "totalLiving", label: "label"},
        {value: "weekNumber", label: "label"},
        {value: "numberOfLivingsKilled", label: "label"},
        {value: "numberOfZombiesKilled", label: "label"},
        {value: "DiedWithoutBeingZombified", label: "label"},
        {value: "livingsDeadByGun", label: "label"},
        {value: "zombiesDeadByGun", label: "label"},
        {value: "livingsDeadByAccident", label: "label"},
        {value: "zombiesDeadByAccident", label: "label"},
        {value: "livingsDeadByFire", label: "label"},
        {value: "zombiesDeadByFire", label: "label"},
        {value: "livingsDeadByDesease", label: "label"},
        {value: "livingsDeadByHunger", label: "label"},
        {value: "zombiesDeadByHunger", label: "label"},
        {value: "livingsDeadByDehydratation", label: "label"},
        {value: "livingsDeadByBladedWeapon", label: "label"},
        {value: "zombiesDeadByBladedWeapon", label: "label"},
        {value: "livingsDeadByTrap", label: "label"},
        {value: "zombiesDeadByTrap", label: "label"},
        {value: "livingsDeadByZombieBite", label: "label"},
        {value: "livingsDeadFromOtherReason", label: "label"}
    ];
    this.historyValuesSelectOptions = [
        {value: "totalZombiesHistory", label: "label"},
        {value: "totalLivingHistory", label: "label"},
        {value: "weekNumberHistory", label: "label"},
        {value: "numberOfLivingsKilledHistory", label: "label"},
        {value: "numberOfZombiesKilledHistory", label: "label"},
        {value: "DiedWithoutBeingZombifiedHistory", label: "label"},
        {value: "livingsDeadByGunHistory", label: "label"},
        {value: "zombiesDeadByGunHistory", label: "label"},
        {value: "livingsDeadByAccidentHistory", label: "label"},
        {value: "zombiesDeadByAccidentHistory", label: "label"},
        {value: "livingsDeadByFireHistory", label: "label"},
        {value: "zombiesDeadByFireHistory", label: "label"},
        {value: "livingsDeadByDeseaseHistory", label: "label"},
        {value: "livingsDeadByHungerHistory", label: "label"},
        {value: "zombiesDeadByHungerHistory", label: "label"},
        {value: "livingsDeadByDehydratationHistory", label: "label"},
        {value: "livingsDeadByBladedWeaponHistory", label: "label"},
        {value: "zombiesDeadByBladedWeaponHistory", label: "label"},
        {value: "livingsDeadByTrapHistory", label: "label"},
        {value: "zombiesDeadByTrapHistory", label: "label"},
        {value: "livingsDeadByZombieBiteHistory", label: "label"},
        {value: "livingsDeadFromOtherReasonHistory", label: "label"}
    ];
    for (var i = 0 ; i < this.directValuesSelectOptions.length ; i++){
        Meteor.call("getServerVariableLabel", this.directValuesSelectOptions[i].value, function(error, result){
            if (!error){
                for (var i = 0 ; i < self.directValuesSelectOptions.length; i ++){
                    if (self.directValuesSelectOptions[i].value == result.value){
                        self.directValuesSelectOptions[i] = result;
                    }
                }
                self.selectOptions.set(self.directValuesSelectOptions);
            }
        });
    }
    for (var i = 0 ; i < this.historyValuesSelectOptions.length ; i++){
        Meteor.call("getServerVariableLabel", this.historyValuesSelectOptions[i].value, function(error, result){
            if (!error){
                for (var i = 0 ; i < self.historyValuesSelectOptions.length; i ++){
                    if (self.historyValuesSelectOptions[i].value == result.value){
                        self.historyValuesSelectOptions[i] = result;
                    }
                }
            }
        });
    }
});

Template.navbar.onRendered(function(){

});

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
        if (graphName != ""){
            var graphType = $("#type").val();
            var selectIds = tmpl.selectIds.get();
            var datas = [];
            for (var i = 0 ; i < selectIds.length ; i ++){
                datas.push($(selectIds[i].id).val());
            }
            Meteor.call("addGraphics", graphName, graphType, datas);
            tmpl.notEnoughSelects.set(false);
            tmpl.tooManySelects.set(false);
            tmpl.missingName.set(false);
            $('#addGraphique').modal('hide');
            $('#sideBar').toggleClass("active");
            $('.overlay').toggleClass("active");
        } else {
            tmpl.missingName.set(true);
        }
    },
	'click .addSelect':function(evt, tmpl){
		addNewSelect();
	},	
	'click .removeSelect':function(evt, tmpl){
		removeSelect();
	},
	'change #type' : function(evt, tmpl){
        tmpl.tooManySelects.set(false);
        tmpl.notEnoughSelects.set(false);
		tmpl.selectIds.set([]);
		var graphType = $("#type").val();
		if (graphType == 'Jauge' || graphType == 'KPI'){
            tmpl.notEnoughSelects.set(false);
            tmpl.tooManySelects.set(false);
            tmpl.selectOptions.set(tmpl.directValuesSelectOptions);
			addNewSelect();
		} else {
            addNewSelect();
            addNewSelect();
            if (graphType == "Histogramme"){
                tmpl.selectOptions.set(tmpl.directValuesSelectOptions);
            } else {
                tmpl.selectOptions.set(tmpl.historyValuesSelectOptions);
            }
        }
        tmpl.type.set(graphType);
    }
});

Template.navbar.helpers({
    graphs:function(){
        return GraphicsList.find();
    },
	selectIds: function(){
		return Template.instance().selectIds.get();
    },
    selectOptions: function(){
        return Template.instance().selectOptions.get();
    },
    missingName: function(){
        return Template.instance().missingName.get();
    },
    notEnoughSelects: function(){
        return Template.instance().notEnoughSelects.get();
    },
    tooManySelects: function(){
        return Template.instance().tooManySelects.get();
    },
    canBeParametered: function(){
        var toReturn = (!(Template.instance().type.get() == "Jauge" || Template.instance().type.get() == "KPI"));
        return toReturn;
    }
});