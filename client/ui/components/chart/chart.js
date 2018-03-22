import './chart.html';
import { Template } from 'meteor/templating';

var count = 0;
var self;

function getValues(){
    for (var i = 0 ; i < self.data.data.length; i++){
        //console.log(self.data.data[i]);
        Meteor.call("getServerVariableValue", self.data.data[i], function(error, result){
            if (!error){
                console.log(result);
            for (var j = 0 ; j < self.data.data.length; j++){
                    if (self.data.data[j] == result.name){
                        self.data.values[result.name] = {value: result.value};
                    }
                }
            }else{
                console.log(error);
            }
            if (count == self.data.data.length -1){
                renderChart();
                count = 0;
            } else {
                count ++;
            }
        });
    }
}

function getLabels(){
    for (var i = 0 ; i < self.data.data.length; i++){
        Meteor.call("getServerVariableLabel", self.data.data[i], function(error, result){
            if(!error){
                for (var j = 0 ; j < self.data.data.length; j++){
                    if (self.data.data[j] == result.label){
                        self.data.values[result.label] = {label : result.value};
                    }
                }
            }else {
                console.log(error);
            }
        });
    }
}

function renderChart(){
    var labels = [];
    var datasets = [];
    for (var i = 0 ; i < self.data.data.length ; i++){
        datasets.push(self.data.values[self.data.data[i]].value);
        labels.push(self.data.values[self.data.data[i].label]);
    }
    if (self.data.type === 'bar') {
        //init chartjs
        var ctx = self.find(".chartCanvas");
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: self.data.settings.labels,
                datasets: self.data.settings.datasets
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
    } else if (self.data.type === 'line') {
        var ctx = self.find(".chartCanvas");
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: self.data.settings.labels,
                datasets: self.data.settings.datasets

            },
            options: {
                scales: {
                    yAxes: [{
                        stacked: true
                    }]
                }
            }
        });
    }
    else if (self.data.type === 'doughnut') {
        var ctx = self.find(".chartCanvas");
        var myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: self.data.settings.labels,
                datasets: self.data.settings.datasets
            },
            options: {
                title: {
                    display: true,
                    text: 'Predicted world population (millions) in 2050'
                }
            }
        })
    }
}

Template.chart.onRendered(function(){
    self = this;
    this.data.values=[];
    if (this.interval){
        Meteor.clearInterval(this.interval);
    }
    getLabels();
    //renderChart();
    console.log("rendu d'un graphe de type " + this.data.type);
    
    this.interval = Meteor.setInterval(getValues, 200);
});