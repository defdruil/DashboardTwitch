import './gauge.html'
import { Template } from 'meteor/templating';

Template.gauge.onCreated(function () {
    let instance = Template.instance();
    this.label = new ReactiveVar("");

    Meteor.call("getServerVariableLabel", instance.data.data[0], function(error, result){
        if (!error){
            instance.label.set(result.label);
        } else{
            console.log(error);
        }
    });

    Template.instance().getValues = function () {
        Meteor.call("getServerVariableValue", instance.data.data[0], function (error, result) {
            if (!error) {
                instance.setNewValue(result.value);
            }
        });
    }

    Template.instance().setNewValue = function (newValue) {
        instance.value.set(newValue);
        instance.graphGauge.dxCircularGauge({ value: newValue });
    }

});

Template.gauge.onRendered(function () {
    if (this.interval) {
        Meteor.clearInterval(this.interval);
    }
    if (this.data.data.length == 1) {
        this.interval = Meteor.setInterval(this.getValues, 500);
    }

    if (Template.instance().interval) {
        clearInterval(Template.instance().interval);
    }
    Template.instance().value = new ReactiveVar(0);
    if (Template.instance().data.data.length == 1) {
        setInterval(Template.instance().getValues, 100);
    }

    const DOMGraph = Template.instance().find(".circularGaugeContainer");
    Template.instance().graphGauge = $(DOMGraph).dxCircularGauge({
        rangeContainer: {
            offset: 10,
            ranges: [
                /*{ startValue: 800, endValue: 1000, color: '#41A128' },
                { startValue: 1000, endValue: 1500, color: '#2DD700' }*/
            ]
        },
        scale: {
            startValue: Template.instance().data.settings.startValue, endValue: Template.instance().data.settings.endValue,
            majorTick: { tickInterval: Template.instance().data.settings.tickInterval },
            label: {
                format: 'number'
            }
        },
        title: {
            text: "",
            subtitle: 'test',
            position: 'top-center'
        },
        tooltip: {
            enabled: true,
            format: 'number',
            customizeText: function (arg) {
                return 'Current ' + arg.valueText;
            }
        },
        subvalueIndicator: {
            /* type: 'textCloud',
                format: 'thousands',
                text: {
                format: 'currency',
                customizeText: function (arg) {
                            return 'Goal ' + arg.valueText;
                }
                }  */
        },
        value: Template.instance().value.get(),
        subvalues: [1400000000]
    });
});

Template.gauge.events({
    'click button': function () {
        if (!Template.instance().value) {
            Template.instance().value = new ReactiveVar(1000000000);
        }
        var newValue = Template.instance().value.get() + 1000000000;
        Template.instance().setNewValue(newValue);
        //Template.instance().value.set(Template.instance().value.get() + 1000000000);
        //Template.instance().graphGauge.dxCircularGauge({ value: Template.instance().value.get() });
    }
});

Template.gauge.helpers({
    label: function(){
        return Template.instance().label.get();
    }
})