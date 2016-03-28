import corgiNames from './names'

const chat = document.getElementById('chat')
const name = corgiNames[Math.floor(Math.random() * corgiNames.length)]
const userInput = document.getElementById('arf')
const MAX_HISTORY = 100
const CHATTER_DELAY = 60
const CHATTER_JITTER = 60
const REPLY_DELAY = 1
const REPLY_JITTER = 3

let speakTimer

function greet () {
  const newElem = document.createElement('li')
  newElem.className = 'greet'
  newElem.innerHTML = `You're chatting with: <span class="name">${name}</span>`
  chat.appendChild(newElem)
}

function speak () {
  const newElem = document.createElement('li')
  newElem.className = 'message corgi'
  newElem.innerHTML = `<span class="name">${name}</span>: aRf aRf`
  // Prevent creating an infinite number of DOM nodes
  if (chat.childElementCount > MAX_HISTORY) {
    chat.firstChild.remove()
  }
  chat.appendChild(newElem)
  chat.scrollTop = chat.scrollHeight
}

function reply (text) {
  const newElem = document.createElement('li')
  newElem.className = 'message user'
  newElem.innerHTML = '<span class="name">You</span>: '
  // Prevents the user from injecting html
  newElem.appendChild(document.createTextNode(text))
  chat.appendChild(newElem)
  if (speakTimer) {
    window.clearTimeout(speakTimer)
  }
  const speakAgain = REPLY_DELAY + Math.random() * REPLY_JITTER // seconds
  window.setTimeout(autoSpeak, speakAgain * 1000)
}

function autoSpeak () {
  if (speakTimer) {
    window.clearTimeout(speakTimer)
  }
  speak()
  const speakAgain = CHATTER_DELAY + Math.random() * CHATTER_JITTER // seconds
  speakTimer = setTimeout(autoSpeak, speakAgain * 1000)
}

function onKey (e) {
  switch (e.keyCode) {
    case 13:
      const text = userInput.value
      if (text) {
        reply(userInput.value)
      }
    // falls through
    case 27:
      userInput.value = ''
      break
  }
}
userInput.addEventListener('keypress', onKey, false)

greet()
window.setTimeout(autoSpeak, REPLY_DELAY * 1000)
