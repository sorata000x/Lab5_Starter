// explore.js

window.addEventListener('DOMContentLoaded', init);

const synth = window.speechSynthesis;
const voiceSelect = document.getElementById("voice-select");
const inputTxt = document.getElementById("text-to-speak");

function init() {
  setTimeout(() => { populateVoiceList();}, 10);
  pressToTalk();
}

const inputForm = document.querySelector("form");

let voices = [];

function populateVoiceList() {
    voices = synth.getVoices();
    for (let i = 0; i < voices.length; i++) {
      const option = document.createElement("option");
      option.textContent = `${voices[i].name} (${voices[i].lang})`;
      if (voices[i].default) {
        option.textContent += " — DEFAULT";
      }
      option.setAttribute("data-lang", voices[i].lang);
      option.setAttribute("data-name", voices[i].name);
      voiceSelect.appendChild(option);
    }  
}

function pressToTalk() {
  let button = document.querySelector('button');

  button.addEventListener('click', function(event) {
    event.preventDefault();
    speakInput();
  })
}

function speakInput() {
  const utterThis = new SpeechSynthesisUtterance(inputTxt.value);
  utterThis.addEventListener('start', function() {
    setFace("assets/images/smiling-open.png");
  })
  utterThis.addEventListener('end', function() {
    setFace("assets/images/smiling.png");
  })
  const selectedOption =
    voiceSelect.selectedOptions[0].getAttribute("data-name");
  for (let i = 0; i < voices.length; i++) {
    if (voices[i].name === selectedOption) {
      utterThis.voice = voices[i];
    }
  }
  synth.speak(utterThis);
  inputTxt.blur();
}

function setFace(src) {
  let face = document.querySelector('img[src^="assets/images/"]');
  face.src = src;
}