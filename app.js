(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _names = require('./names');

var _names2 = _interopRequireDefault(_names);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chat = document.getElementById('chat');
var name = choice(_names2.default);
var userInput = document.getElementById('arf');
var VOCABULARY = ['arf', 'arf', 'arf', 'Arf', 'aRf', 'aRf', 'aRf!', 'rrrrrr', 'rrrrRRRRRRrrrr'];
var MAX_HISTORY = 100;
var CHATTER_DELAY = 60;
var CHATTER_JITTER = 60;
var REPLY_DELAY = 1;
var REPLY_JITTER = 2;

var speakTimer = void 0;

function choice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function greet() {
  var newElem = document.createElement('li');
  newElem.className = 'greet';
  newElem.innerHTML = 'You\'re chatting with: <span class="name">' + name + '</span>';
  chat.appendChild(newElem);
}

function arf() {
  var count = choice([2, 2, 2, 3, 3, 4, 5, 6]);
  var words = [];
  for (var i = count; i; --i) {
    words.push(choice(VOCABULARY));
  }
  var sentence = words.join(' ');
  if (Math.random() < 0.4) {
    return sentence + '!';
  }
  if (Math.random() < 0.1) {
    return sentence + '?';
  }
  return sentence;
}

function speak() {
  var newElem = document.createElement('li');
  newElem.className = 'message corgi';
  newElem.innerHTML = '<span class="name">' + name + '</span>: ' + arf();
  // Prevent creating an infinite number of DOM nodes
  if (chat.childElementCount > MAX_HISTORY) {
    chat.firstChild.remove();
  }
  chat.appendChild(newElem);
  chat.scrollTop = chat.scrollHeight;
}

function reply(text) {
  var newElem = document.createElement('li');
  newElem.className = 'message user';
  newElem.innerHTML = '<span class="name">You</span>: ';
  // Prevents the user from injecting html
  newElem.appendChild(document.createTextNode(text));
  chat.appendChild(newElem);
  if (speakTimer) {
    window.clearTimeout(speakTimer);
  }
  var speakAgain = REPLY_DELAY + Math.random() * REPLY_JITTER; // seconds
  window.setTimeout(autoSpeak, speakAgain * 1000);
}

function autoSpeak() {
  if (speakTimer) {
    window.clearTimeout(speakTimer);
  }
  speak();
  var speakAgain = CHATTER_DELAY + Math.random() * CHATTER_JITTER; // seconds
  speakTimer = setTimeout(autoSpeak, speakAgain * 1000);
}

function onKey(e) {
  switch (e.keyCode) {
    case 13:
      var text = userInput.value;
      if (text) {
        reply(userInput.value);
      }
    // falls through
    case 27:
      userInput.value = '';
      break;
  }
}
userInput.addEventListener('keypress', onKey, false);

greet();
window.setTimeout(autoSpeak, REPLY_DELAY * 1000);

},{"./names":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// https://sites.google.com/site/thequeenscorgis/home
var names = ['Bee', 'Bee', 'Billy', 'Brush', 'Bushy', 'Busy', 'Buzz', 'Carol', 'Chipper', 'Chipper', 'Crackers', 'Diamond', 'Dookie', 'Emma', 'Fable', 'Foxy', 'Heather', 'Holly', 'Honey', 'Jane', 'Johnny', 'Jolly', 'Kelpie', 'Linnet', 'Minnie', 'Monty', 'Myth', 'Pharos', 'Phoenix', 'Piper', 'Pippin', 'Ranger', 'Rush', 'Shadow', 'Sherry', 'Smokey', 'Sox', 'Sparky', 'Sugar', 'Susan', 'Swift', 'Tiny', 'Whiskey', 'Willow'];

exports.default = names;

},{}]},{},[1]);
