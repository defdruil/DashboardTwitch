import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './home.html';
import '../../../../collections/GraphicsList';

Template.home.onCreated(function homeOnCreated() {
  Template.instance().counter = new ReactiveVar(0);
});

Template.home.helpers({
  allGraphs: function () {
    return GraphicsList.find()
  },
  counter: function() {
    return Template.instance().counter.get();
  }
});