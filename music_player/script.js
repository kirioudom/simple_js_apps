const musicData = [
  { pathSong: "./jacinto-1.mp3", pathImg: "./img/jacinto-1.jpg" },
  { pathSong: "./jacinto-2.mp3", pathImg: "./img/jacinto-2.jpg" },
  { pathSong: "./jacinto-3.mp3", pathImg: "./img/jacinto-3.jpg" },
  { pathSong: "./metric-1.mp3", pathImg: "./img/metric-1.jpg" },
];

// function updateDuration() {
//   const playedDurationView = document.querySelector("#playedDuration");
//   const songDurationView = document.querySelector("#songDuration");
//   playedDurationView.textContent = ''
// }

// 00:00
// 00:10

function convertDuration(minute, second) {
  let secondInView = "";
  let minuteInView = "";

  if (second < 10) {
    secondInView = `0${second}`;
  } else {
    secondInView = `${second}`;
  }

  if (minute < 10) {
    minuteInView = `0${minute}`;
  } else {
    minuteInView = `${minute}`;
  }

  return `${minuteInView}:${secondInView}`;
}

function main() {
  const music = document.querySelector("audio");
  const playedDurationView = document.querySelector("#playedDuration");
  const songDurationView = document.querySelector("#songDuration");
  const playBtn = document.querySelector("#playButton");
  const progressFill = document.querySelector("#progressFill");
  const playIcon = document.querySelector("#playIcon");
  let isMusicPlay = false;

  music.ontimeupdate = () => {
    const progressInPercent = Math.floor(
      (music.currentTime / music.duration) * 100
    );
    const playingSecond = Math.floor(music.currentTime / music.duration);
    const minute = Math.floor(music.currentTime / 60);
    const second = Math.floor(music.currentTime % 60);

    progressFill.style.width = `${progressInPercent}%`;

    playedDurationView.textContent = `${convertDuration(minute, second)}`;
  };

  music.onloadeddata = () => {
    const minute = Math.floor(music.duration / 60);
    const second = Math.floor(music.duration % 60);
    songDurationView.textContent = `${convertDuration(minute, second)}`;
  };

  music.onpause = () => {
    playIcon.classList.replace("fa-pause", "fa-play");
  };

  music.onplaying = () => {
    playIcon.classList.replace("fa-play", "fa-pause");
  };

  playBtn.addEventListener("click", () => {
    if (isMusicPlay) {
      isMusicPlay = false;
      music.pause();
      return;
    }
    isMusicPlay = true;
    music.play();
  });
}

window.onload = main;
