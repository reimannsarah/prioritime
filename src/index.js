import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Day from './day.js';
import Activity from './activity.js';
import Week from './week';

//this is a bad idea but here is a global newWeek
let newWeek = new Week();

function handleFormSubmission(e) {
  e.preventDefault();
  const userFreeTime = document.getElementById("free-time").value;
  //add dropdown menu and get value from menu to pass in as name to Day object
  const dayOf = document.getElementById("dayOf").value;
  //change variable to 'newDay' instead of 'today' and pass in dayOf variable for name
  let newDay = new Day(dayOf, userFreeTime);
  //instantiate new Week and add Day to it
  newWeek.addDay(newDay);
  //change argument from 'today' to 'newDay'
  // displayDay(newDay);
  displayWeek(newWeek);
  console.log(newWeek);
}

function displayWeek(week) {
  let weekDiv = document.getElementById("week");
  weekDiv.innerHTML = null;
  const weekArray = Object.keys(week);
  weekArray.forEach(day => {
    if (week[day].name) {
      let dayDiv = document.createElement("div");
      let p = document.createElement("p");
      p.innerHTML = week[day].name.toUpperCase();
      weekDiv.append(dayDiv, p);
      printBlocks(week[day].available);
      displayActivityInput(week[day]);
    }
  });
}


// function displayDay(day) {
//   displayActivityInput(day);
//   printBlocks(day.available, "available");
// }

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

  // add submit event listener to the acitivity input, but pass day object by calling the function inside the event handler
  activityForm.addEventListener("submit", function (e) {
    getUserInputActivity(e, day);
  });
}

function getUserInputActivity(e, day) {
  e.preventDefault();
  let userActivity = document.querySelector("input[name='activities']").value;
  let activity = new Activity(userActivity);
  day.addActivity(activity);
  displayActivities(day, activity);
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

function printBlocks(blockNums) {
  let blocksDiv = document.getElementById("week");
  // blocksDiv.innerHTML = null;
  for (let i = 0; i < blockNums; i++) {
    const blockDiv = document.createElement("div");
    blockDiv.classList = "blocks";
    blocksDiv.append(blockDiv);
  }
}

window.addEventListener("load", function () {
  document.querySelector("form").addEventListener("submit", handleFormSubmission);
});

