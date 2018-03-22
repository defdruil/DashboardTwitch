import { Template } from 'meteor/templating';

var self;

function getValues(){
    Meteor.call("getServerVariableValue", self.data.data[0], function(error, result){
        if (!error){
            self.oldValue.set(self.value.get());
            self.value.set(result.value);
            if (self.oldValue.get() > self.value.get()){
                self.upOrDown.set("arrow-circle-down");
            } else if (self.oldValue.get() == self.value.get()){
                self.upOrDown.set("window-minimize");
            } else {
                self.upOrDown.set("arrow-circle-up");
            }
        }
    });
}

Template.kpi.onCreated(function(){
    self = this;
    if (this.interval){
        Meteor.clearInterval(this.interval);
    }
    this.value = ReactiveVar(0);
   this.oldValue = ReactiveVar(0); 
   this.upOrDown = ReactiveVar("window-minimize");
   this.interval = Meteor.setInterval(getValues, 100);
});

Template.kpi.onRendered(function(){
    console.log("rendu d'un graphe de type " + this.data.type);    
    //Template.instance().$(".kpiChart").html(Template.instance().data.settings.value);
});

Template.kpi.events({
    'click button': function() {
        //Template.instance().$(".kpiChart").html((Template.instance().data.settings.value += 10));        
    }
});

Template.kpi.helpers({
    value: function(){
        return Template.instance().value.get();
    },
    wentUp: function(){
        return Template.instance().value.get() > Template.instance().oldValue.get();
    },
    stayedStill: function(){
        return Template.instance().value.get() == Template.instance().oldValue.get();
    },
    wentDown: function(){
        return Template.instance().value.get() < Template.instance().oldValue.get();
    },
    upOrDown: function(){
        return Template.instance().upOrDown.get();
    }
})