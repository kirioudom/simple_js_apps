// convert 1 sec to 00:01
// 2 minutes to 02:00
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

// function convertDuration(minute, second) {
//   return `0${minute}`.slice(-2) + ":" + `0${second}`.slice(-2);
// }

function musicProvider() {
  const musicData = [
    { pathSong: "./music/jacinto-1.mp3", pathImg: "./img/jacinto-1.jpg" },
    { pathSong: "./music/jacinto-2.mp3", pathImg: "./img/jacinto-2.jpg" },
    { pathSong: "./music/jacinto-3.mp3", pathImg: "./img/jacinto-3.jpg" },
    { pathSong: "./music/metric-1.mp3", pathImg: "./img/metric-1.jpg" },
  ];
  let indexMusicData = 0;

  const nextMusic = () => {
    if (indexMusicData == 3) {
      indexMusicData = 0;
      return musicData[indexMusicData];
    }
    indexMusicData += 1;
    return musicData[indexMusicData];
  };

  const previousMusic = () => {
    if (indexMusicData == 0) {
      indexMusicData = 3;
      return musicData[indexMusicData];
    }
    indexMusicData -= 1;

    return musicData[indexMusicData];
  };

  const currentMusic = () => {
    return musicData[indexMusicData];
  };
  return [previousMusic, currentMusic, nextMusic];
}

//@arg obj of path location and picture location
function loadMusic(music) {
  const musicAudioElm = document.querySelector("audio");
  musicAudioElm.src = music.pathSong;
  musicAudioElm.autoplay = true;
  const musicPicture = document.querySelector("#musicPicture");
  musicPicture.src = music.pathImg;
}

function updateProgress({ currentTime, duration }) {
  const progressFill = document.querySelector("#progressFill");
  const playedDurationView = document.querySelector("#playedDuration");

  const minute = Math.floor(currentTime / 60);
  const second = Math.floor(currentTime % 60);

  const progressInPercent = (currentTime / duration) * 100;

  progressFill.style.width = `${progressInPercent}%`;
  playedDurationView.textContent = `${convertDuration(minute, second)}`;
}

function initAudioElm(musicProivder) {
  const music = document.querySelector("audio");
  const songDurationView = document.querySelector("#songDuration");
  const progressBar = document.querySelector("#progressBar");
  const [previousMusic, currentMusic, nextMusic] = musicProvider();
  const playIcon = document.querySelector("#playIcon");

  music.ontimeupdate = (e) => {
    updateProgress(e.target);
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

  music.addEventListener("ended", () => {
    loadMusic(nextMusic());
  });

  progressBar.addEventListener("click", ({ offsetX }) => {
    const { offsetWidth } = progressBar.offsetWidth;
    //how to convert progress to duration?
    const { duration } = music;
    const second = Math.floor((offsetX / offsetWidth) * duration);
    music.currentTime = second;
    updateProgress({ currentTime: second, duration });
  });

  return [
    () => {
      loadMusic(currentMusic());
    },
    () => {
      loadMusic(nextMusic());
    },
    () => {
      loadMusic(previousMusic());
    },
    () => {
      music.play();
    },
    () => {
      music.pause();
    },
  ];
}

function main() {
  const playBtn = document.querySelector("#playButton");
  const forwardButton = document.querySelector("#forwardButton");
  const backwardButton = document.querySelector("#backwardButton");

  const [loadFirstMusic, nextMusic, previousMusic, playMusic, pauseMusic] =
    initAudioElm();
  let isMusicPlay = false;

  //load first music
  loadFirstMusic();

  backwardButton.addEventListener("click", previousMusic);

  forwardButton.addEventListener("click", nextMusic);

  playBtn.addEventListener("click", () => {
    if (isMusicPlay) {
      isMusicPlay = false;
      pauseMusic();
      return;
    }
    isMusicPlay = true;

    playMusic();
  });
}

window.onload = main;
