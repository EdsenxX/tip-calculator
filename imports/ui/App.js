import { Template } from "meteor/templating";
import { ReactiveDict } from "meteor/reactive-dict";

import "./App.html";

Template.app.onCreated(function appOnCreated() {
  this.state = new ReactiveDict();
  this.state.set("total", 0);
  this.state.set("tipAmount", 0);
  this.state.set("amount", 0);
  this.state.set("people", 1);
});

Template.app.helpers({
  total() {
    return Template.instance().state.get("total");
  },
  tipAmount() {
    return Template.instance().state.get("tipAmount");
  },
  amount() {
    return Template.instance().state.get("amount");
  },
  people() {
    return Template.instance().state.get("people");
  },
});

const calculateTip = (instance) => {
  let tipPercentage = instance.state.get("tipPercentage");
  let amount = instance.state.get("amount");
  let people = instance.state.get("people");
  if (amount && tipPercentage && people) {
    tipPercentage = parseInt(tipPercentage) / 100;
    amount = parseInt(amount);
    people = parseInt(people);

    const tipAmount = (amount * tipPercentage) / people;
    let total = amount * tipPercentage + amount;
    total = total / people;
    instance.state.set("tipAmount", tipAmount);
    instance.state.set("total", total);
  }
};

Template.app.events({
  "click .tip"(event, instance) {
    const { percentage } = event.target.dataset;
    instance.state.set("tipPercentage", percentage);
    document.getElementById("customTip").value = "";
    calculateTip(instance);
  },
  "keyup  #amount"(event, instance) {
    instance.state.set("amount", event.target.value);
    console.log(event.target.value);
    calculateTip(instance);
  },
  "keyup #people"(event, instance) {
    instance.state.set("people", event.target.value);
    console.log(event.target.value);
    calculateTip(instance);
  },
  "keyup #customTip"(event, instance) {
    instance.state.set("tipPercentage", event.target.value);
    console.log(event.target.value);
    calculateTip(instance);
  },
  "click #reset"(event, instance) {
    instance.state.set("amount", 0);
    instance.state.set("tipPercentage", 0);
    instance.state.set("people", 1);
    instance.state.set("tipAmount", 0);
    instance.state.set("total", 0);
  },
});
