import './gauge.html'
import { Template } from 'meteor/templating';

var self;

function getValues(){
    Meteor.call("getServerVariableValue", self.data[0], function(error, result){
        if(!error){
            self.value.set(result.value);
            self.graphGauge.dxCircularGauge({ value: self.value.get() });
        }
    });
}

Template.gauge.onCreated(function() {
    //Template.instance().value = new ReactiveVar(1000000000);
    self = this;
    if (this.interval){
        clearInterval(this.interval);
    }
    this.value = new ReactiveVar(0);
    if(this.data.length == 1){
        setInterval(getValues, 100);
    }
    
});

Template.gauge.onRendered(function () {
    //console.log("Rendu d'un graphe de type", this.data.type);
    //console.log("Attribut data:", Template.instance().data);
	/*Meteor.call("getCurrentValues", function(error, result){
		if(!error){
			console.log(result);
		} else {
			console.log(error);
		}
	});*/
	//console.log(Meteor.call("start"));
	//console.log(Meteor.call("stop"));
	//console.log(Meteor.call("reset"));
	//console.log(Template.instance());
	//console.log(this);
	
    // init jauge
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
            startValue: Template.instance().settings.startValue, endValue: Template.instance().settings.endValue,
            majorTick: { tickInterval: Template.instance().settings.tickInterval },
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

        Template.instance().value.set(Template.instance().value.get() + 1000000000);
        Template.instance().graphGauge.dxCircularGauge({ value: Template.instance().value.get() });
    }
})