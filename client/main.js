// Client entry point, imports all client code

import '/imports/startup/client';
import '/imports/startup/both';
import Chart from 'chart.js';

Template.Home.onRendered(function() {
   
      
//graph 2
      var randomScalingFactor = function() {
        return Math.round(Math.random() * 100);
    };

    var ctx2 = document.getElementById("doughnut");
    var myChart4 = new Chart(ctx2, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                ],
                backgroundColor: [
                    "rgb(255, 99, 132)",
                    "rgb(255, 175, 61)",
                    "rgb(252, 255, 51)",
                    "rgb(94, 255, 51)",
                    "rgb(51, 82, 255)",

                ],
                label: 'Dataset 1'
            }],
            labels: [
                "Red",
                "Orange",
                "Yellow",
                "Green",
                "Blue"
            ]
        },
        options: {
            responsive: true,
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Doughnut Chart'
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    });

      //graph3
      $("#circularGaugeContainer").dxCircularGauge({
        rangeContainer: { 
          offset: 10,
          ranges: [
            { startValue: 800, endValue: 1000, color: '#41A128' },
            { startValue: 1000, endValue: 1500, color: '#2DD700' }
          ]
        },
        scale: {
          startValue: 0,  endValue: 1500,
          majorTick: { tickInterval: 250 },
          label: {
            format: 'currency'
          }
        },
        title: {
          text: 'Sales MTD',
          subtitle: 'test',
          position: 'top-center'
        },
        tooltip: {
              enabled: true,
          format: 'currency',
              customizeText: function (arg) {
                  return 'Current ' + arg.valueText;
              }
          },
        subvalueIndicator: {
          type: 'textCloud',
          format: 'thousands',
          text: {
            format: 'currency',
            customizeText: function (arg) {
                      return 'Goal ' + arg.valueText;
            }
          }  
        },
        value: 900,
        subvalues: [825]
      });
    });
