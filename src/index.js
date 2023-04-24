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
  keys.forEach(key => {
    const p = document.createElement("p");
    p.innerText = day.activities[key].name;
    document.getElementById("activity").append(p);
  });
}

function displayActivityInput() {
  const form = document.querySelector("#activity1");
  const newInput = document.createElement("input");
  const label = document.createElement("label");

  newInput.type = "text";
  newInput.name = "activities"
  label.innerText = "Activity: ";
  form.after(label, newInput);
}

function handleFormSubmission(e) {
  e.preventDefault();
  const userFreeTime = document.getElementById("free-time").value;
  const userActivity = document.querySelectorAll("input[name='activities']");

  let today = new Day(userFreeTime);

  userActivity.forEach(element => {
    let activity = new Activity(element.value);
    today.addActivity(activity);
  });

  displayDay(today);
}

document.querySelector("form").addEventListener("submit", handleFormSubmission);
document.getElementById("add-activity").addEventListener("click", displayActivityInput)