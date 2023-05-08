// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  selectHorn();
  playSound();
  changeVolume();
}

function selectHorn() {
  let hornSelect = document.getElementById('horn-select');
  hornSelect.addEventListener('input', function() {
    setImage(hornSelect.value);
    setAudioSrc(hornSelect.value);
  })
}

function setImage(name) {
  let img = document.querySelector('img[src^="assets/images/"]');
  img.src = "assets/images/" + name + ".svg";
  img.alt = name;
}

function setAudioSrc(name) {
  let audio = document.querySelector('audio');
  audio.src = "assets/audio/" + name + ".mp3";
}

function playSound() {
  let button = document.querySelector('button');
  button.addEventListener('click', function() {
    let audio = document.querySelector('audio');
    audio.play();
    let hornSelect = document.getElementById('horn-select');
    if(hornSelect.value == 'party-horn') {
      const jsConfetti = new JSConfetti();
      jsConfetti.addConfetti();
    }
  })
}

function changeVolume() {
  let volumeControl = document.getElementById('volume');
  volumeControl.addEventListener('change', function() {
    setAudioVolume(volumeControl.value / 100);
    setVolumeIcon(volumeControl.value);
  })
}

function setAudioVolume(value) {
  let audio = document.querySelector('audio');
  audio.volume = value;
}

function setVolumeIcon(value) {
  let icon = document.querySelector('img[src^="assets/icons/"]');
  if(value == 0) {
    console.log("54");
    icon.src = "assets/icons/volume-level-0.svg";
    icon.alt = "Volumn Level 0";
  } else if(value < 33) {
    icon.src = "assets/icons/volume-level-1.svg";
    icon.alt = "Volumn Level 1";
  } else if(value < 67) {
    icon.src = "assets/icons/volume-level-2.svg";
    icon.alt = "Volumn Level 2";
  } else {
    icon.src = "assets/icons/volume-level-3.svg";
    icon.alt = "Volumn Level 3";
  }
}
