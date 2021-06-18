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

function musicPlayListRecord() {
  const musicData = [
    { pathSong: "./music/jacinto-1.mp3", pathImg: "./img/jacinto-1.jpg" },
    { pathSong: "./music/jacinto-2.mp3", pathImg: "./img/jacinto-2.jpg" },
    { pathSong: "./music/jacinto-3.mp3", pathImg: "./img/jacinto-3.jpg" },
    { pathSong: "./music/metric-1.mp3", pathImg: "./img/metric-1.jpg" },
  ];
  let indexMusicData = 0;

  const moveIndexForward = () => {
    if (indexMusicData == 3) {
      indexMusicData = 0;
      return musicData[indexMusicData];
    }
    indexMusicData += 1;
    return musicData[indexMusicData];
  };

  const moveIndexBackward = () => {
    if (indexMusicData == 0) {
      indexMusicData = 3;
      return musicData[indexMusicData];
    }
    indexMusicData -= 1;

    return musicData[indexMusicData];
  };
  return [moveIndexBackward, moveIndexForward];
}

//@arg obj of path location and picture location
function updateMusic(music) {
  const musicAudioElm = document.querySelector("audio");
  musicAudioElm.src = music.pathSong;
  musicAudioElm.autoplay = true;
  const musicPicture = document.querySelector("#musicPicture");
  musicPicture.src = music.pathImg;
}

function main() {
  const music = document.querySelector("audio");
  const playedDurationView = document.querySelector("#playedDuration");
  const songDurationView = document.querySelector("#songDuration");
  const playBtn = document.querySelector("#playButton");
  const progressFill = document.querySelector("#progressFill");
  const playIcon = document.querySelector("#playIcon");
  const forwardButton = document.querySelector("#forwardButton");
  const backwardButton = document.querySelector("#backwardButton");
  const [moveIndexBackward, moveIndexForward] = musicPlayListRecord();

  let isMusicPlay = false;

  music.ontimeupdate = () => {
    const progressInPercent = Math.floor(
      (music.currentTime / music.duration) * 100
    );

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

  backwardButton.addEventListener("click", () => {
    const songInfo = moveIndexBackward();
    updateMusic(songInfo);
  });

  forwardButton.addEventListener("click", () => {
    const songInfo = moveIndexForward();
    updateMusic(songInfo);
  });

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
