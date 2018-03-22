import './kpi.html';
import { Template } from 'meteor/templating';

Template.kpi.onCreated(function () {
    let instance = Template.instance();
    this.value = new ReactiveVar(0);
    this.oldValue = new ReactiveVar(0);
    this.upOrDown = new ReactiveVar("window-minimize");
    this.label = new ReactiveVar("");
    console.log(instance);
    Template.instance().getValues = function () {
        Meteor.call("getServerVariableValue", instance.data.data[0], function (error, result) {
            if (!error) {
                instance.oldValue.set(instance.value.get());
                instance.value.set(result.value);
                if (instance.oldValue.get() > instance.value.get()) {
                    instance.upOrDown.set("fa-arrow-circle-down red");
                } else if (instance.oldValue.get() == instance.value.get()) {
                    instance.upOrDown.set("fa-window-minimize grey");
                } else {
                    instance.upOrDown.set("fa-arrow-circle-up green");
                }
                instance.kpiIcon = instance.$(".kpiIcon");
                instance.kpiIcon.removeClass("red green grey fa-arrow-circle-down fa-window-minimize fa-arrow-circle-up").addClass(instance.upOrDown.get());
            }
        });
    }
    Meteor.call("getServerVariableLabel", instance.data.data[0], function (error, result) {
        if (!error) {
            instance.label.set(result.label);
        } else {
            console.log(error);
        }
    });

    if (this.interval) {
        Meteor.clearInterval(this.interval);
    }
    this.interval = Meteor.setInterval(this.getValues, 500);
});

Template.kpi.onRendered(function () {
    console.log("rendu d'un graphe de type " + this.data.type);
    //Template.instance().$(".kpiChart").html(Template.instance().data.settings.value);
});

Template.kpi.events({
    'click button': function () {
        //Template.instance().$(".kpiChart").html((Template.instance().data.settings.value += 10));        
    }
});

Template.kpi.helpers({
    value: function () {
        return Template.instance().value.get();
    },
    wentUp: function () {
        return Template.instance().value.get() > Template.instance().oldValue.get();
    },
    stayedStill: function () {
        return Template.instance().value.get() == Template.instance().oldValue.get();
    },
    wentDown: function () {
        return Template.instance().value.get() < Template.instance().oldValue.get();
    },
    upOrDown: function () {
        return Template.instance().upOrDown.get();
    },
    label: function () {
        return Template.instance().label.get();
    }
});