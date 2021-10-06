// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";
import { Report } from 'notiflix';


const selector = document.querySelector('#date-selector')
const btnStartNode = document.querySelector('button[data-start]');
const btnStopNode = document.querySelector('button[data-stop]');
const dateDays = document.querySelector('span[data-days]');
const dateHours = document.querySelector('span[data-hours]');
const dateMinutes = document.querySelector('span[data-minutes]');
const dateSeconds = document.querySelector('span[data-seconds]');
const timer = document.querySelector('.timer');


timer.style.display = 'flex';
timer.style.color = 'red';


let currentDate = new Date();
let selectedDate = new Date();
let timerId = null;
let startTime = {};
btnStartNode.disabled = true;
btnStopNode.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    theme: 'dark',
    onClose(selectedDates) {
      selectedDate = selectedDates[0]
      if(selectedDate < options.defaultDate){
      Report.warning('Please choose a date in the future', '', 'Ok');
      btnStartNode.disabled = true;
      btnStopNode.disabled = true;
    } else {
      btnStartNode.disabled = false;
      btnStopNode.disabled = false;
    }
  }
}

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
  

btnStartNode.addEventListener('click', onClick);

function showTime(startTime) {
  
  dateDays.textContent = addLeadingZero(startTime.days);
  dateHours.textContent = addLeadingZero(startTime.hours);
  dateMinutes.textContent = addLeadingZero(startTime.minutes);
  dateSeconds.textContent = addLeadingZero(startTime.seconds);
}

function onClick() {
    timerId = setInterval(() => {
      currentDate = new Date()

        if (currentDate < selectedDate) {
          startTime = convertMs(selectedDate - currentDate);
          showTime(startTime);
        } else {
          btnStopNode.disabled = false;
          clearInterval(timerId);
        }
    }, options.minuteIncrement);
};



function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

btnStopNode.addEventListener ('click', () => {
    clearInterval(timerId);
})

flatpickr(selector, options)