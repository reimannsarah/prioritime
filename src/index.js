import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Day from './day.js';
import Activity from './activity.js';

// Business Logic




// UI Logic

function displayDay(day) {
  document.getElementById("available").innerText = day.available;
  const activityButton = document.createElement("button");
  activityButton.innerText = "Add Activity";
  activityButton.setAttribute("id", "activity-button");
  const outDiv = document.getElementById("output");
  outDiv.append(activityButton);

  activityButton.addEventListener("click", function() {
    displayActivityInput();
    day.addActivity(getUserInputActivity());
    let keys = Object.keys(day.activities);
    keys.forEach(key => {
      const p = document.createElement("p");
      const addBtn = document.createElement("button");
      const removeBtn = document.createElement("button");
      const blocks = document.createElement("div");
      blocks.setAttribute("id", `${day.activities[key].name}-blocks`);
  
      addBtn.innerText = "+";
      addBtn.setAttribute("id", "add-btn");
      
      removeBtn.innerText = "-";
      removeBtn.setAttribute("id", "remove-btn");
  
      p.setAttribute("id", day.activities[key].name)
      p.innerText = day.activities[key].name;
      p.append(addBtn, removeBtn, blocks);
  
      addBtn.addEventListener("click", function() {
        day.addActivityBlocks(day.activities[key].name);
        printBlocks(day.available, "available");
        printBlocks(day.activities[key].blocks, `${day.activities[key].name}-blocks`);
      });
  
      removeBtn.addEventListener("click", function() {
        day.subtractActivityBlocks(day.activities[key].name);
        printBlocks(day.available, "available");
        printBlocks(day.activities[key].blocks, `${day.activities[key].name}-blocks`);
      });
      document.getElementById("activity").append(p);
    });
  });
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

function displayActivityInput() {
  const newInput = document.createElement("input");
  const label = document.createElement("label");
  const actButton = document.createElement("button");
  actButton.innerText = "Submit";
  actButton.type = "submit";
  newInput.type = "text";
  newInput.name = "activities";
  label.innerText = "Activity: ";
  document.getElementById("activForm").addEventListener("submit", function(event) {
    event.preventDefault();
  });
  document.getElementById("activForm").append(label, newInput, actButton);
}

function getUserInputActivity() {
  const userActivity = document.querySelector("input[name='activities']").value;

  let activity = new Activity(userActivity);

  return activity;
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
document.getElementById("add-activity").addEventListener("click", displayActivityInput);