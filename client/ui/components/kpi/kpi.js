import { Template } from 'meteor/templating';

Template.kpi.onCreated(function () {
    let instance = Template.instance();

    Template.instance().getValues = function () {
        Meteor.call("getServerVariableValue", instance.data.data[0], function (error, result) {
            if (!error) {
                instance.oldValue.set(instance.value.get());
                instance.value.set(result.value);
                if (instance.oldValue.get() > instance.value.get()) {
                    instance.upOrDown.set("arrow-circle-down");
                } else if (instance.oldValue.get() == instance.value.get()) {
                    instance.upOrDown.set("window-minimize");
                } else {
                    instance.upOrDown.set("arrow-circle-up");
                }
            }
        });
    }

    if (this.interval) {
        Meteor.clearInterval(this.interval);
    }
    this.value = ReactiveVar(0);
    this.oldValue = ReactiveVar(0);
    this.upOrDown = ReactiveVar("window-minimize");
    this.interval = Meteor.setInterval(this.getValues, 100);
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
    }
})