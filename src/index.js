import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Day from './day.js';
import Activity from './activity.js';

function checkUserFreeTimeValue(value) {
  if (value <= 24 && value > 0) {
    return value;
  } else {
    const errorMsg = `Not a valid input`;
    throw new Error(errorMsg);
  }
}

function checkUserActivityInput(value) {
  if (value === null || value === '') {
    const errorMsg = `Not a valid activity input`;
    throw new Error(errorMsg);
  } else {
    return value;
  }
}

function printError(msg) {
  document.querySelector("#error-msg").innerText = msg.message;
}

function displayActivities(day, activity) {
  const p = document.createElement("p");
  const addBtn = document.createElement("button");
  const removeBtn = document.createElement("button");
  const blocks = document.createElement("div");
  blocks.setAttribute("id", `${activity.name}-blocks`);

  addBtn.innerText = "+";
  addBtn.setAttribute("id", "add-btn");

  removeBtn.innerText = "-";
  removeBtn.setAttribute("id", "remove-btn");

  p.setAttribute("id", activity.name);
  p.innerText = activity.name;
  p.append(addBtn, removeBtn, blocks);

  addBtn.addEventListener("click", function () {
    day.addActivityBlocks(activity.name);
    printBlocks(day.available, "available");
    printBlocks(day.activities[activity.name].blocks, `${activity.name}-blocks`);
  });

  removeBtn.addEventListener("click", function () {
    day.subtractActivityBlocks(activity.name);
    printBlocks(day.available, "available");
    printBlocks(day.activities[activity.name].blocks, `${activity.name}-blocks`);
  });
  document.getElementById("activity").append(p);
}

function displayDay(day) {
  displayActivityInput(day);
  printBlocks(day.available, "available");
}

function printBlocks(blockNums, div) {
  let blocksDiv = document.getElementById(div);
  blocksDiv.innerHTML = null;
  for (let i = 0; i < blockNums; i++) {
    const blockDiv = document.createElement("div");
    blockDiv.classList = "blocks";
    blocksDiv.append(blockDiv);
  }
}

function displayActivityInput(day) {
  const activityForm = document.getElementById("activForm");
  const newInput = document.createElement("input");
  const label = document.createElement("label");
  const actButton = document.createElement("button");

  actButton.innerText = "Submit";
  actButton.id = "add-activity";

  newInput.type = "text";
  newInput.name = "activities";

  label.innerText = "Activity: ";

  activityForm.append(label, newInput, actButton);

  activityForm.addEventListener("submit", function (e) {
    getUserInputActivity(e, day);
  });
}

function getUserInputActivity(e, day) {
  e.preventDefault();
  let userActivity = document.querySelector("input[name='activities']").value;
  document.querySelector("input[name='activities']").value = null;
  document.querySelector("#error-msg").innerText = null;
  try {
    let validateUserActivity = checkUserActivityInput(userActivity);
    let activity = new Activity(validateUserActivity);
    day.addActivity(activity);
    displayActivities(day, activity);
  } catch (error) {
    printError(error);
  }
}

function displayPrioritiesList(e) {
  e.preventDefault();
  const goalDiv = document.querySelector('#goal-list');
  goalDiv.innerHTML = null;
  const ol = document.createElement("ol");
  goalDiv.append(ol);

  const items = document.querySelectorAll("input[name='priorities']");
  items.forEach(item => {
    if (item.value) {
      const li = document.createElement("li");
      li.innerText = item.value;
      ol.append(li);
    }
  });
}

function exitPopUp() {
  document.querySelector("#info-popup").classList = "hidden";
}

function clearForm() {
  const inputs = document.querySelectorAll("input[name='priorities']");
  inputs.forEach(input => {
    input.value = null;
  });
}

function addPriorityInput() {
  const div = document.querySelector("#info-popup");
  const li = document.createElement("li");
  const input = document.createElement("input");
  input.type = "text";
  input.name = "priorities";

  li.append(input);
  div.querySelector("ol").append(li);
}

function displayInfoPopUp() {
  const infoDiv = document.querySelector("#info-popup");
  infoDiv.classList.remove("hidden");
  infoDiv.querySelector("#exit-popup").addEventListener("click", exitPopUp);
  infoDiv.querySelector("#add-more-inputs").addEventListener("click", addPriorityInput);
  infoDiv.querySelector("#priority-list").addEventListener('submit', function (e) {
    displayPrioritiesList(e);
    exitPopUp();
    clearForm();
  });
}

function clearOutputField() {
  document.querySelector("#available").innerHTML = null;
  document.querySelector("#activity").innerHTML = null;
}

function handleFormSubmission(e) {
  e.preventDefault();
  clearOutputField();
  const userFreeTime = document.getElementById("free-time").value;
  document.querySelector("#error-msg").innerText = null;
  try {
    let validateUserFreeTime = checkUserFreeTimeValue(userFreeTime);
    let today = new Day(validateUserFreeTime);
    displayDay(today);
  } catch (error) {
    printError(error);
  }
}

window.addEventListener("load", function () {
  document.querySelector("#free-time-form").addEventListener("submit", handleFormSubmission);
  this.document.querySelector("#info").addEventListener("click", displayInfoPopUp);
});

