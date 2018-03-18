import './chart.html';
import { Template } from 'meteor/templating';

Template.chart.onRendered(function(){
    console.log("rendu d'un graphe de type " + this.data.type);
    if (this.data.type === 'bar') {
        //init chartjs
        var ctx = Template.instance().find(".chartCanvas");
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Template.instance().data.settings.labels,
                datasets: Template.instance().data.settings.datasets
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
    } else if (this.data.type === 'line') {
        var ctx = Template.instance().find(".chartCanvas");
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Template.instance().data.settings.labels,
                datasets: Template.instance().data.settings.datasets

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
    else if (this.data.type === 'doughnut') {
        var ctx = Template.instance().find(".chartCanvas");
        var myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Template.instance().data.settings.labels,
                datasets: Template.instance().data.settings.datasets
            },
            options: {
                title: {
                    display: true,
                    text: 'Predicted world population (millions) in 2050'
                }
            }
        })
    }
});