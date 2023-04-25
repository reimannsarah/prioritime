import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Day from './day.js';
import Activity from './activity.js';
import Week from './week';

//this is a bad idea but here is a global newWeek
let newWeek = new Week();

// function handleFormSubmission(e) {
//   e.preventDefault();

//   const userFreeTime = document.getElementById("free-time").value;
//   document.querySelector("#error-msg").innerText = null;
//   try {
//     let validateUserFreeTime = checkUserFreeTimeValue(userFreeTime);
//     let today = new Day(validateUserFreeTime);
//     displayDay(today);
//   } catch (error) {
//     printError(error);
//   }
// }

function handleFormSubmission(e) {
  e.preventDefault();
  clearOutputField();
  const userFreeTime = document.getElementById("free-time").value;
  //add dropdown menu and get value from menu to pass in as name to Day object
  const dayOf = document.getElementById("dayOf").value;
  //change variable to 'newDay' instead of 'today' and pass in dayOf variable for name
  let newDay = new Day(dayOf, userFreeTime);
  //instantiate new Week and add Day to it
  newWeek.addDay(newDay);
  //change argument from 'today' to 'newDay'
  // displayDay(newDay);
  displayWeek(newDay);
}

function displayWeek(day) {
  let weekDiv = document.getElementById("week");
  const weekCard = document.createElement("div");
  weekCard.classList = "week-card";
  weekCard.id = `${day.name}`;

  let p = document.createElement("p");
  let blockdiv = document.createElement("div");
  blockdiv.id = `${day.name}-blocks`;
  p.innerHTML = day.name.toUpperCase();

  weekCard.append(p, blockdiv);
  weekDiv.append(weekCard);
  printBlocks(day.available, `${day.name}-blocks`);
  displayActivityInput(day);
}

function displayActivityInput(day) {
  const weekCard = document.getElementById(`${day.name}`);
  const form = document.createElement("form");
  const newInput = document.createElement("input");
  const label = document.createElement("label");
  const actButton = document.createElement("button");

  actButton.innerText = "Submit";
  actButton.id = "add-activity";

  newInput.type = "text";
  newInput.name = "activities";

  label.innerText = "Activity: ";

  form.append(label, newInput, actButton);
  weekCard.append(form);
  form.addEventListener("submit", function (e) {
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
    printBlocks(day.available, "week");
    printBlocks(day.activities[activity.name].blocks, `${activity.name}-blocks`);
  });
  removeBtn.addEventListener("click", function () {
    day.subtractActivityBlocks(activity.name);
    printBlocks(day.available, `${day.name}-blocks`);
    printBlocks(day.activities[activity.name].blocks, `${activity.name}-blocks`);
  });
  document.getElementById("activity").append(p);
}

function printBlocks(blockNums, div) {
  let blocksDiv = document.getElementById(div);
  let timeTotal = parseFloat(blockNums / 4);
  const timeRemains = document.getElementById("free-time").value;

  blocksDiv.innerHTML = null;
  for (let i = 0; i < blockNums; i++) {
    const blockDiv = document.createElement("div");
    blockDiv.classList = "blocks";
    blocksDiv.append(blockDiv);
  }
  blocksDiv.append(`${timeTotal} out of ${timeRemains} hour(s)`);
}

// error handling

// function checkUserFreeTimeValue(value) {
//   if (value <= 24 && value > 0) {
//     return value;
//   } else {
//     const errorMsg = `Not a valid input`;
//     throw new Error(errorMsg);
//   }
// }


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


// priority popup stuff

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
  });
}

function clearOutputField() {
  document.querySelector("#week").innerHTML = null;
  document.querySelector("#activity").innerHTML = null;
}



window.addEventListener("load", function () {
  document.querySelector("#free-time-form").addEventListener("submit", handleFormSubmission);
  this.document.querySelector("#info").addEventListener("click", displayInfoPopUp);
});

