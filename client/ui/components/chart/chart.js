import './chart.html';
import { Template } from 'meteor/templating';

Template.chart.onRendered(function () {
    let instance = Template.instance();
    this.count = 0;
    this.chart;
    this.hasLabels = false;
    this.labelsCount = 0;
    this.weekNumberHistory = [];
    this.data.values = [];

    Template.instance().renderChart = function () {
        //var labels = [];
        //var datasets = [];

        if (instance.data.type === 'bar') {
            instance.handleBarBehavior();
        } else if (instance.data.type === 'line') {
            instance.handleLineBehavior();
        }
        else if (instance.data.type === 'doughnut') {
            instance.handleDoughnutBehavior();
        }
    }

    Template.instance().handleBarBehavior = function () {
        var data = [];
        var backgroundColor = [];
        var borderColor = [];
        var datasets = [];
        var labels = [];
        for (var i = 0; i < instance.data.data.length; i++) {
            data.push(instance.data.values[instance.data.data[i]].value);
            labels.push(instance.data.values[instance.data.data[i]].label);
            backgroundColor.push(instance.data.settings.datasets[0].backgroundColor[i]);
            borderColor.push(instance.data.settings.datasets[0].borderColor[i]);
        }
        datasets.push({
            data: data,
            label: "",
            backgroundColor: backgroundColor,
            borderColor: borderColor
        });
        if (!instance.chart) {
            //init chartjs
            var ctx = instance.find(".chartCanvas");
            instance.chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: datasets
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        } else {
            for (var i = 0; i < datasets[0].data.length; i++) {
                if (instance.chart.data.datasets[0].data[i] != datasets[0].data[i]) {
                    instance.chart.data.datasets[0].data[i] = datasets[0].data[i];
                }
                if (instance.chart.data.labels != labels) {
                    instance.chart.data.labels = labels;
                }
            }

            //instance.chart.data.datasets = datasets;
            instance.chart.update();
        }
    }

    Template.instance().handleDoughnutBehavior = function () {
        var labels = [];
        var datasets = [];
        var backgroundColor = [];
        var data = [];
        for (var i = 0; i < instance.data.data.length; i++) {
            data.push(instance.data.values[instance.data.data[i]].value);
            labels.push(instance.data.values[instance.data.data[i]].label);
            backgroundColor.push(instance.data.settings.datasets[0].backgroundColor[i]);
        }
        datasets.push({
            data: data,
            label: "",
            backgroundColor: backgroundColor
        });
        if (!instance.chart) {
            var ctx = instance.find(".chartCanvas");
            instance.chart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    datasets: datasets
                },
                labels: labels,
                options: {
                    title: {
                        display: false
                    }
                }
            });
        } else {
            for (var i = 0; i < datasets[0].data.length; i++) {
                if (instance.chart.data.datasets[0].data[i] != datasets[0].data[i]) {
                    instance.chart.data.datasets[0].data[i] = datasets[0].data[i];
                }
                if (instance.chart.data.labels != labels) {
                    instance.chart.data.labels = labels;
                }
            }
            instance.chart.update();
        }
    }

    Template.instance().handleLineBehavior = function () {
        var datasets = [];
        for (var i = 0; i < instance.data.data.length; i++) {
            datasets.push({
                data: instance.data.values[instance.data.data[i]].value,
                label: instance.data.values[instance.data.data[i]].label,
                backgroundColor: instance.data.settings.datasets[i].borderColor,
                fill: false
            });
        }
        if (!instance.chart) {
            var ctx = instance.find(".chartCanvas");
            instance.chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: instance.weekNumberHistory,
                    datasets: datasets
                },
                options: {
                    scales: {
                        yAxes: [{
                            stacked: true
                        }]
                    }
                }
            });
        } else {
            for (var i = 0; i < datasets.length; i++) {
                if(instance.weekNumberHistory.length < instance.chart.data.labels.length){
                    instance.chart.data.datasets = datasets;
                    instance.chart.data.labels = instance.weekNumberHistory;
                }
                for(var j = 0; j < instance.weekNumberHistory.length ; j++){
                    if(!instance.chart.data.datasets[i].data[j]){
                        instance.chart.data.labels.push(instance.weekNumberHistory[j]);
                        instance.chart.data.datasets[i].data.push(datasets[i].data[j]);
                    }

                }
                if (instance.chart.data.datasets[i].label != datasets[i].label) {
                    instance.chart.data.datasets[i] = datasets[i].label;
                }
            }
            
            instance.chart.update(0);
        }
    }

    Template.instance().getValues = function () {
        Meteor.call("getServerVariableValue", "weekNumberHistory", function(error, result){
            if(!error){
                instance.weekNumberHistory = result.value;
            }
        });
        for (var i = 0; i < instance.data.data.length; i++) {
            Meteor.call("getServerVariableValue", instance.data.data[i], function (error, result) {
                if (!error) {
                    if (instance.data.values[result.name]) {
                        instance.data.values[result.name].value = result.value;
                    } else {
                        instance.data.values[result.name] = { value: result.value, label: "" };
                    }
                    if (instance.hasLabels) {
                        if (instance.count == instance.data.data.length - 1) {
                            instance.renderChart();
                            instance.count = 0;
                        } else {
                            instance.count++;
                        }
                    }
                } else {
                    console.log(error);
                }
            });
        }
    }

    Template.instance().getLabels = function () {
        for (var i = 0; i < instance.data.data.length; i++) {
            Meteor.call("getServerVariableLabel", instance.data.data[i], function (error, result) {
                if (!error) {
                    if (instance.data.values[result.name]) {
                        instance.data.values[result.name].label = result.label;
                    } else {
                        instance.data.values[result.value] = { label: result.label, value: 0 };
                    }
                    if (instance.labelsCount == instance.data.data.length - 1) {
                        instance.hasLabels = true;
                    } else {
                        instance.labelsCount++;
                    }
                    //console.log(instance.data.values[result.value]);
                } else {
                    console.log(error);
                }
            });
        }
    }

    this.getLabels();
    if (this.interval) {
        Meteor.clearInterval(this.interval);
    }
    console.log("rendu d'un graphe de type " + this.data.type);

    this.interval = Meteor.setInterval(this.getValues, 100);
});