import './css/styles.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Day from './day.js';
import Activity from './activity.js';

// Business Logic




// UI Logic

function displayDay(day) {
  document.getElementById("available").innerText = day.available;
  let keys = Object.keys(day.activities);
  document.getElementById("activity").innerText = day.activities[keys[0]].name;

}

function handleFormSubmission(e) {
  e.preventDefault();
  const userFreeTime = document.getElementById("free-time").value;
  const userActivity = document.getElementById("activity1").value;
  let today = new Day(userFreeTime);
  let activity = new Activity(userActivity);
  today.addActivity(activity);
  displayDay(today);
}

document.querySelector("form").addEventListener("submit", handleFormSubmission);