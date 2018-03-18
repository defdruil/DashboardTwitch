import './gauge.html'
import { Template } from 'meteor/templating';

Template.gauge.onCreated(function() {
    Template.instance().value = new ReactiveVar(1000000000);
});

Template.gauge.onRendered(function () {
    console.log("Rendu d'un graphe de type", this.data.type);
    console.log("Attribut data:", Template.instance().data);
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
            startValue: Template.instance().data.settings.startValue, endValue: Template.instance().data.settings.endValue,
            majorTick: { tickInterval: Template.instance().data.settings.tickInterval },
            label: {
                format: 'number'
            }
        },
        title: {
            text: Template.instance().data.title,
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