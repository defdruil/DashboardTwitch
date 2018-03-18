import { Template } from 'meteor/templating';

Template.kpi.onRendered(function(){
    console.log("rendu d'un graphe de type " + this.data.type);    
    Template.instance().$(".kpiChart").html(Template.instance().data.settings.value);
});

Template.kpi.events({
    'click button': function() {
        Template.instance().$(".kpiChart").html((Template.instance().data.settings.value += 10));        
    }
});