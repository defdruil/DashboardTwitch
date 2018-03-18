// Client entry point, imports all client code

import '/imports/startup/client';
import '/imports/startup/both';
import Chart from 'chart.js';
import popper from 'popper.js';
global.Popper = popper;


Template.home.onRendered(function() {
   
      
//graph 2
      /*var randomScalingFactor = function() {
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

      //graph3*/
      
    });
