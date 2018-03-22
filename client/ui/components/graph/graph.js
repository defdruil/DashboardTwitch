import './graph.html';
import { ReactiveVar } from 'meteor/reactive-var';
import { Template } from 'meteor/templating';

Template.graph.onCreated(function () {

    /*var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
    });*/
});

Template.graph.helpers({
    value: function () {
        if (Template.instance().value == null) {
            Template.instance().value = new ReactiveVar(1000000000);
        }
        return Template.instance().value.get();
    },
    graph: function () {
        if (Template.instance().data.type === 'gauge') {
            return Template.instance().graphGauge;
        } else {
            //chartjs
        }
    },
    isGauge: function () {
        return Template.instance().data.type === 'gauge';
    },
    isChart: function () {
        const chartTypes = ['bar', 'line', 'doughnut'];
        return chartTypes.indexOf(Template.instance().data.type) != -1;
    },
    isKpi: function () {
        return Template.instance().data.type === 'KPI';
    }
});