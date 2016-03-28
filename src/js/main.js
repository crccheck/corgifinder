import corgiNames from './names';

const chat = document.getElementById('chat');
const name = corgiNames[Math.floor(Math.random() * corgiNames.length)];
let speakTimer;

function greet() {
  const newElem = document.createElement('li');
  newElem.className = 'greet';
  newElem.innerHTML = `You're chatting with: <span class="name">${name}</span>`
  chat.appendChild(newElem);
}

function speak() {
  const newElem = document.createElement('li');
  newElem.className = 'message corgi';
  newElem.innerHTML = `<span class="name">${name}</span>: aRf aRf`;
  chat.appendChild(newElem);
}

function autoSpeak() {
  speak();
  const speakAgain = 60 + Math.random() * 100;  // seconds
  speakTimer = setTimeout(autoSpeak, speakAgain * 1000);
}

greet();
autoSpeak();
