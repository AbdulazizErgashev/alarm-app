const hoursEl = document.querySelector("#hours");
const minutesEl = document.querySelector("#minutes");
const secondsEl = document.querySelector("#seconds");
const amPmEl = document.querySelector("#am-pm");
const alarmTimeInput = document.querySelector("#alarm-time");
const setAlarmBtn = document.querySelector("#set-alarm-btn");
const clearAlarmBtn = document.querySelector("#clear-alarm-btn");
const alarmMessageEl = document.querySelector("#alarm-message");

let alarmTime = null;
let alarmTimeout = null;

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  const amPm = hours >= 12 ? "P.M" : "A.M";

  hours = hours % 12 || 12;

  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
  amPmEl.textContent = amPm;

  checkAlarm(hours, minutes, amPm);
}

function checkAlarm(hours, minutes, amPm) {
  if (
    alarmTime ===
    `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )} ${amPm}`
  ) {
    alarmMessageEl.classList.remove("hidden");
    playAlarmSound();
    clearTimeout(alarmTimeout);
  }
}

function playAlarmSound() {
  const audio = new Audio("https://www.soundjay.com/button/beep-07.wav");
  audio.play();
}

setAlarmBtn.addEventListener("click", () => {
  const alarmInputValue = alarmTimeInput.value;
  if (!alarmInputValue) {
    alert("Please set a valid time for the alarm!");
    return;
  }

  const [alarmHours, alarmMinutes] = alarmInputValue.split(":");
  const now = new Date();
  const amPm = alarmHours >= 12 ? "P.M" : "A.M";

  alarmTime = `${String(alarmHours % 12 || 12).padStart(2, "0")}:${String(
    alarmMinutes
  ).padStart(2, "0")} ${amPm}`;
  alarmMessageEl.classList.add("hidden");
  alert(`Alarm set for ${alarmTime}`);
});

clearAlarmBtn.addEventListener("click", () => {
  alarmTime = null;
  alarmMessageEl.classList.add("hidden");
  clearTimeout(alarmTimeout);
  alert("Alarm cleared!");
});

setInterval(updateClock, 1000);
