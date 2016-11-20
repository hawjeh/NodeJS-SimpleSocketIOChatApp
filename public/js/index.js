'use strict';

let name = $('input[name=name]');
let room = $('input[name=room]');

$("form#join-form").submit(function(e) {
  e.preventDefault();
  setLocalItem("name", name.val());
  setLocalItem("room", room.val());
  window.location.href = "/chat.html";
});

$(document).ready(function() {
  var name = getLocalItem("name");
  var room = getLocalItem("room");

  if (name && room) {
    window.location.href = "/chat.html";
  }
});
