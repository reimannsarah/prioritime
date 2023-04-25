import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Day from './day.js';
import Activity from './activity.js';

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

  addBtn.addEventListener("click", function() {
    day.addActivityBlocks(activity.name);
    printBlocks(day.available, "available");
    printBlocks(day.activities[activity.name].blocks, `${activity.name}-blocks`);
  });

  removeBtn.addEventListener("click", function() {
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
  const acitivityForm = document.getElementById("activForm");
  const newInput = document.createElement("input");
  const label = document.createElement("label");
  const actButton = document.createElement("button");

  actButton.innerText = "Submit";
  actButton.id = "add-activity";

  newInput.type = "text";
  newInput.name = "activities";

  label.innerText = "Activity: ";

  acitivityForm.append(label, newInput, actButton);

  // add submit event listener to the acitivity input, but pass day object by calling the function inside the event handler
  acitivityForm.addEventListener("submit", function(e) {
    getUserInputActivity(e, day);
  });
}
// 
function getUserInputActivity(e, day) {
  e.preventDefault();
  let userActivity = document.querySelector("input[name='activities']").value;
  let activity = new Activity(userActivity);
  day.addActivity(activity);
  displayActivities(day, activity);
}

function displayPrioritiesList(e) {
  e.preventDefault();

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

function displayInfoPopUp() {
  const infoDiv = document.querySelector("#info-popup");
  infoDiv.classList.remove("hidden");
  infoDiv.querySelector("form.priority-list").addEventListener('submit', function(e) {
    displayPrioritiesList(e);
    exitPopUp();
    clearForm();
  });
  infoDiv.querySelector("#exit-popup").addEventListener("click", exitPopUp);
}

function handleFormSubmission(e) {
  e.preventDefault();
  const userFreeTime = document.getElementById("free-time").value;
  let today = new Day(userFreeTime);
  // display user's free time as blocks
  displayDay(today);
}

window.addEventListener("load", function() {
  document.querySelector("form").addEventListener("submit", handleFormSubmission);
  this.document.querySelector("#info").addEventListener("click", displayInfoPopUp);
});

