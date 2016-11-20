'use strict';

var socket = io();

function scrollToBottom() {
  // Selectors
  var messages = $('#messages');
  var newMessage = messages.children('li:last-child');

  // Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

$("form#message-form").submit(function(e) {
  e.preventDefault();
});

$('#save-chat').on('click', (e) => {
  $('<a></a>')
    .attr('id', 'export')
    .attr('href', 'data:application/octet-stream,' + encodeURIComponent($('#messages').html()))
    .attr('download', 'log.html')
    .appendTo('body');

  $('#export').ready(function() {
    $('#export').get(0).click();
    $('#export').remove();
  });
});

$('#message-form').on('submit', (e) => {
  e.preventDefault();
  var messageTextBox = $('input[name=message]');
  socket.emit('createMessage', {
    text: messageTextBox.val()
  }, () => {
    messageTextBox.val("");
  });
});

$('#send-location').on('click', (e) => {
  var that = $('#send-location');
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  that.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition((position) => {
    that.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, () => {
    that.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.');
  });
});


$(document).ready(function() {
  var name = getLocalItem("name");
  var room = getLocalItem("room");

  if (!name || !room) {
    clearLocalItem();
    return window.location.href = "/";
  } else {
    registerEvent(name, room);
  }
});

function registerEvent(name, room) {
  socket.on('connect', function() {
    var params = {
      name: name,
      room: room
    }

    socket.emit('join', params, function(err) {
      if (err) {
        alert(err);
        clearLocalItem();
        window.localtion.href = "/";
      }
    });
  });

  socket.on('updateUserList', (users) => {
    var ul = $('<ul></ul>');
    users.forEach((user) => {
      ul.append($('<li></li>').text(user));
    });
    $('#users').html(ul);
  });

  socket.on('newMessage', (message) => {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
      text: message.text,
      from: message.from,
      createdAt: formattedTime
    });
    $('#messages').append(html);
    scrollToBottom();
  });

  socket.on('newLocationMessage', (message) => {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#location-template').html();
    var html = Mustache.render(template, {
      url: message.url,
      from: message.from,
      createdAt: formattedTime
    });
    $('#messages').append(html);
    scrollToBottom();
  });

  socket.on('newUserMessage', (message) => {
    console.log('New User Message', message);
  });

  socket.on('disconnect', () => {
    clearLocalItem();
    console.log('Disconnected to server');
  });
}
