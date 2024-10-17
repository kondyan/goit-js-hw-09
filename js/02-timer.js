import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

let selectedTime;

const refs = {
  startButton: document.querySelector("[data-start]"),
  dataDays: document.querySelector("[data-days]"),
  dataHours: document.querySelector("[data-hours]"),
  dataMinutes: document.querySelector("[data-minutes]"),
  dataSeconds: document.querySelector("[data-seconds]"),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      window.alert("Please choose a date in the future");
    }
    selectedTime = selectedDates[0];
  },
};

flatpickr("#datetime-picker", options);

refs.startButton.addEventListener("click", () => {
  let timerId;
  if (selectedTime <= Date.now()) {
    window.alert("Please choose a date in the future");
    return;
  }

  refs.startButton.disabled = true;
  timerId = setInterval(() => {
    const timer = selectedTime - Date.now();

    if (timer <= 0) {
      clearInterval(timerId);
      refs.startButton.style.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timer);

    refs.dataSeconds.innerText = addLeadingZero(seconds.toString());
    refs.dataMinutes.innerText = addLeadingZero(minutes.toString());
    refs.dataHours.innerText = addLeadingZero(hours.toString());
    refs.dataDays.innerText = addLeadingZero(days.toString());
  }, 1000);
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.padStart(2, "0");
}
