const COUNT_SETTING = "COUNT_SETTING";
const COUNTDOWN_TIMER = "COUNTDOWN_TIMER";

function defineMinDate() {
  const dateElm = document.querySelector("input[type='date']");
  const currentDate = new Date();

  const [month, date] = [
    currentDate.getMonth() + 1 > 9
      ? currentDate.getMonth() + 1
      : `0${currentDate.getMonth() + 1}`,
    currentDate.getDate() > 9
      ? currentDate.getDate()
      : `0${currentDate.getDate()}`,
  ];

  dateElm.setAttribute("min", `${currentDate.getFullYear()}-${month}-${date}`);
}

function setAndGetcountdownDateInit() {
  let inputDate = "";

  const getInputDate = () => inputDate;
  const setInputDate = (date) => (inputDate = new Date(date));

  return [getInputDate, setInputDate];
}

function readLocalStorage() {
  const taskName = localStorage.getItem("taskName");
  const lastInputDate = localStorage.getItem("lastInputDate");
  return [taskName, lastInputDate];
}

//read local storage
//start time / continue
//calculate between the start date and end date
//set to local storage, start and end.
//update view of countdown timer

//1.if there is time left, continue counting in counting page
//2. otherwise show setting form

//first hide both elem
//decide which elem to show
//than depends on toggling button to show or hide elem

function showPage(page) {
  if (page === COUNT_SETTING) {
    showSettingPage();
  }
  if (page === COUNTDOWN_TIMER) {
    showCountdownPage();
  }
}

function showCountdownPage() {
  const countdownEle = document.querySelector("#countdownEle");
  const countdownSettingUpElm = document.querySelector("#countdownSettingElm");

  countdownEle.classList.remove("hide");
  countdownSettingUpElm.classList.add("hide");
}

function showSettingPage() {
  const countdownSettingUpElm = document.querySelector("#countdownSettingElm");
  const countdownEle = document.querySelector("#countdownEle");

  countdownSettingUpElm.classList.remove("hide");
  countdownEle.classList.add("hide");
}

function countingPage({ taskName, date }) {
  const resetBtn = document.querySelector("#resetBtn");
  const taskNameElm = document.querySelector("#taskName");
  const [updateDurationText, updateTimeup, resetTextColor] = countingView();

  let calculateDate = date - Date.now();

  taskNameElm.innerText = taskName;

  let timer = setInterval(() => {
    calculateDate = calculateDate - 1000;
    if (calculateDate <= 0) {
      clearTimeout(timer);
      updateTimeup();
    }
    console.log(calculateDate);
    updateDurationText(calculateDate);
  }, 1000);

  resetBtn.addEventListener("click", (e) => {
    resetTextColor();
    clearInterval(timer);
    localStorage.removeItem("lastInputDate");
    showPage(COUNT_SETTING);
  });

  showPage(COUNTDOWN_TIMER);
}

function countingView() {
  const [dayEle, hourEle, minuteEle, secondEle] =
    document.querySelectorAll(".counting");

  const updateDurationText = (date) => {
    const [sec, minute, hour, day] = milliseconToDate(date);
    dayEle.innerText = day;
    hourEle.innerHTML = hour;
    minuteEle.innerHTML = minute;
    secondEle.innerHTML = sec;
  };

  const updateTimeup = () => {
    [dayEle, hourEle, minuteEle, secondEle].forEach((textDuration) => {
      textDuration.classList.add("text-red", "animated-duration");
    });
  };
  const resetTextColor = () => {
    [dayEle, hourEle, minuteEle, secondEle].forEach((textDuration) => {
      textDuration.classList.remove("text-red");
    });
  };

  return [updateDurationText, updateTimeup, resetTextColor];
}

function milliseconToDate(dateInMillisecond) {
  const hour = dateInMillisecond / 1000 / 60 / 60;
  const minute = (hour % 1) * 60;
  const sec = (minute % 1) * 60;
  const day = hour / 24;

  return [sec, minute, hour, day].map((duration) => Math.floor(duration));
}

function setAndGetTaskName(taskName = "taskName") {
  const setTaskName = (taskName) => (taskName = taskName);
  const getTaskName = () => taskName;
  return [getTaskName, setTaskName];
}

function main() {
  const dateElm = document.querySelector('input[type="date"]');
  const submitBtn = document.querySelector("#btnSubmit");
  const nameElm = document.querySelector("#name");
  const [getInputDate, setInputDate] = setAndGetcountdownDateInit();
  const [getTaskName, setTaskName] = setAndGetTaskName();
  const countdownLeft = localStorage.getItem("lastInputDate");

  if (countdownLeft) {
    countingPage({
      date: new Date(countdownLeft),
      taskName: localStorage.getItem("taskName"),
    });
  }

  defineMinDate();
  nameElm.addEventListener("input", (e) => {
    setTaskName(e.target.value);
  });

  dateElm.addEventListener("input", (e) => {
    setInputDate(e.target.value);
  });

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const date = getInputDate();
    const taskName = getTaskName();
    if (date === "" || date < Date.now()) {
      return;
    }
    localStorage.setItem("lastInputDate", date);
    localStorage.setItem("taskName", taskName);
    // countingPage({ date, taskName });
    countingPage({ date: Date.now() + 7000, taskName });
  });
}

window.onload = main;
