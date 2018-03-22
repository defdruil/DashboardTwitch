import './header.html';
import '../../pages/home/home.html';
import $ from 'jquery';
import { Template } from 'meteor/templating';

var self;

function getNewValues(){
    Meteor.call("getServerVariableValue", "day", function(error, result){
        if (!error){
         self.day.set(result.value);
        } else {
            console.log(error);
        }
    });
    Meteor.call("getServerVariableValue", "month", function(error, result){
        if (!error){
         self.month.set(result.value);
        } else {
            console.log(error);
        }
    });
    Meteor.call("getServerVariableValue", "year", function(error, result){
        if (!error){
         self.year.set(result.value);
        } else {
            console.log(error);
        }
    });
    Meteor.call("getServerVariableValue", "weekNumber", function(error, result){
        if (!error){
         self.weekNumber.set(result.value);
        } else {
            console.log(error);
        }
    });
    Meteor.call("getServerVariableValue", "totalLiving", function(error, result){
        if (!error){
         self.totalLiving.set(result.value);
        } else {
            console.log(error);
        }
    });
    Meteor.call("getServerVariableValue", "totalZombies", function(error, result){
        if (!error){
         self.totalZombies.set(result.value);
        } else {
            console.log(error);
        }
    });
  }

function resetValues(){
    Meteor.call("getServerVariableValue", "totalPopulation", function(error, result){
        if (!error){
         self.totalPopulation.set(result.value);
         $("#population").val(result.value);
        }
    });
 }

Template.header.onCreated(function(){
    self = Template.instance();
    if (this.interval){
        clearInterval(this.interval);
      }
      this.totalPopulation = new ReactiveVar(0);
      this.day = new ReactiveVar(0);
      this.month = new ReactiveVar(0);
      this.year = new ReactiveVar(0);
      this.weekNumber = new ReactiveVar(0);
      this.totalZombies = new ReactiveVar(0);
      this.totalLiving = new ReactiveVar(0);
      resetValues();
      setInterval(getNewValues, 100);
});

Template.header.helpers({
    totalPopulation: function(){
        return Template.instance().totalPopulation.get();
      },
      day: function(){
        return Template.instance().day.get();
      },
      month: function(){
        return Template.instance().month.get();
      },
      year: function(){
        return Template.instance().year.get();
      },
      weekNumber: function(){
        return Template.instance().weekNumber.get();
      },
      totalZombies: function(){
        return Template.instance().totalZombies.get();
      },
      totalLivings: function(){
        return Template.instance().totalLiving.get();
      },
      ereme: function() {
          var d = Template.instance().day.get()
         if (d == 1){
             return "er";
         } else {
             return "";
         }
      },
      monthToFrench: function(){
          var monthNumberToFrenchName = [
              "",
              "janvier",
              "février",
              "mars",
              "avril",
              "mai",
              "juin",
              "juillet",
              "août",
              "septembre",
              "octobre",
              "novembre",
              "décembre"
          ];
          var month = Template.instance().month.get();
          return monthNumberToFrenchName[month];
      }
});

Template.header.events({
    'click .start': function(){
      Meteor.call("start");
    },
    'click .stop': function(){
      Meteor.call("stop");
    },
    'click .reset': function(){
      Meteor.call("reset", resetValues());
    },
    'click .resetForPopulation': function(){
      Meteor.call("resetForPopulation", $("#population").val());
    }
  });