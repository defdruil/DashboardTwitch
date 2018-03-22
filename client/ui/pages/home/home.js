import { ReactiveVar } from 'meteor/reactive-var';
import { Template } from 'meteor/templating';
import './home.html';
import '../../../../collections/GraphicsList';



Template.home.onCreated(function() {
  this.counter = new ReactiveVar(0);
});

Template.home.helpers({
  allGraphs: function () {
    return GraphicsList.find()
  },
  counter: function() {
    return Template.instance().counter.get();
  }
});