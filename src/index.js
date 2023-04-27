import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Day from './day.js';
import Activity from './activity.js';
import Week from './week';
import User from './user';
import Storage from './storage.js';

//this is a bad idea but here is a global newWeek
let user;

function saveUser(user, userName) {
  Storage.saveUser(user, userName)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        printError(response);
      }
    });
}

function getUser(userName) {
  Storage.getData(userName)
    .then(function (response) {
      if (response) {
        console.log(response.user);
      } else {
        console.log(response);
      }
    });
}


function newUser() {
  document.getElementById("welcome").classList = "hidden";
  document.getElementById("hidden").removeAttribute("id", "hidden");
}

function existingUser() {
  document.getElementById("existingUserDiv").removeAttribute("class", "hidden");
  document.getElementById("loadData").addEventListener("click", findUser);
}

function findUser(e) {
  e.preventDefault();
  document.getElementById("welcome").classList = "hidden";
  const name = document.getElementById("name").value.toLowerCase();
  user = getUser(name);
  console.log(user);
}

function handleFormSubmission(e) {
  e.preventDefault();
  const userFreeTime = document.getElementById("free-time").value;
  const dayOf = document.getElementById("dayOf").value;
  const userName = document.getElementById("userName").value.toLowerCase();
  const user_name = document.getElementById("userName").value;
  displayName(user_name);
  try {
    let validateDay = checkForDayInstance(dayOf);
    let validateUserFreeTime = checkUserFreeTimeValue(userFreeTime);
    let newDay = new Day(validateDay, validateUserFreeTime);
    let newWeek = new Week("week_1");
    newWeek.addDay(newDay);
    user = new User(userName);
    user.addWeek(newWeek);
    displayWeek(newDay);
  } catch (error) {
    printError(error);
  }
}

function displayName(userName) {
  document.getElementById("userName").setAttribute("class", "hidden");
  const helloUser = document.createElement("h3");
  helloUser.innerText = `Hello, ${userName}!`;
  const nameDisplay = document.getElementById("userNameDisplay");
  nameDisplay.innerHTML = null;
  nameDisplay.append(helloUser);

}

function checkForDayInstance(value) {
  const daysToCheck = document.querySelector("#week").childNodes;
  if (!daysToCheck) {
    return value;
  } else {
    daysToCheck.forEach(card => {
      if (card.id === value) {
        const errorMsg = `You already have that day!`;
        throw new Error(errorMsg);
      }
    });
  } return value;
}

function displayWeek(day) {
  let weekDiv = document.getElementById("week");
  const weekCard = document.createElement("div");
  weekCard.classList = "week-card";
  weekCard.id = `${day.name}`;

  let p = document.createElement("p");
  let blockdiv = document.createElement("div");
  blockdiv.id = `${day.name}-blocks`;
  blockdiv.dataset.hours = day.available / 4;
  blockdiv.classList = "block-group";
  p.innerText = day.name.toUpperCase();

  weekCard.append(p, blockdiv);
  weekDiv.append(weekCard);
  printBlocks(day.available, `${day.name}-blocks`);
  setDayReset(`${day.name}`);
  displayActivityInput(day);
  if (document.getElementById("week").hasChildNodes() && !document.querySelector(".weekResetButton")) {
    setWeekReset();
  }
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
  newInput.id = `${day.name}-input`;
  newInput.setAttribute("onfocus", "this.value=''");

  label.innerText = "Activity: ";

  form.id = `${day.name}-form`;
  form.append(label, newInput, actButton);
  weekCard.append(form);

  form.addEventListener("submit", function (e) {
    getUserInputActivity(e, day);
  });
}

function getUserInputActivity(e, day) {
  e.preventDefault();
  let userActivity = document.querySelector(`#${day.name}-input`).value;
  document.querySelector(`#${day.name}-input`).value = null;
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

  // NEW vv
  blocks.setAttribute("id", `${activity.name}-${day.name}-blocks`);
  blocks.dataset.hours = document.querySelector(`#${day.name}-blocks`).dataset.hours;
  // NEW ^^

  blocks.classList = "block-group";

  addBtn.innerText = "+";
  addBtn.setAttribute("id", "add-btn");

  removeBtn.innerText = "-";
  removeBtn.setAttribute("id", "remove-btn");

  p.setAttribute("id", activity.name);
  p.innerText = activity.name;
  p.append(addBtn, removeBtn, blocks);
  addBtn.addEventListener("click", function () {
    day.addActivityBlocks(activity.name);
    printBlocks(day.available, `${day.name}-blocks`);
    printBlocks(day.activities[activity.name].blocks, `${activity.name}-${day.name}-blocks`);
  });
  removeBtn.addEventListener("click", function () {
    day.subtractActivityBlocks(activity.name);
    printBlocks(day.available, `${day.name}-blocks`);
    printBlocks(day.activities[activity.name].blocks, `${activity.name}-${day.name}-blocks`);
  });
  const weekCard = document.getElementById(`${day.name}`);
  weekCard.querySelector("form").before(p);
}

function printBlocks(blockNums, div) {
  let blocksDiv = document.getElementById(div);
  let timeTotal = parseFloat(blockNums / 4);
  const dayHours = document.getElementById(div);

  blocksDiv.innerHTML = null;
  for (let i = 0; i < blockNums; i++) {
    const blockDiv = document.createElement("div");
    blockDiv.classList = "blocks";
    blocksDiv.append(blockDiv);
  }
  blocksDiv.append(`${timeTotal} out of ${dayHours.dataset.hours} hour(s)`);
}

// error handling

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


// priority popup stuff

function displayPrioritiesList(e) {
  e.preventDefault();
  const goalDiv = document.querySelector('#goal-list');
  if (!document.querySelector(".priorityResetButton")) {
    setPriorityReset();
  }
  goalDiv.classList.remove("hidden");
  goalDiv.querySelector("ol").innerHTML = null;
  const ol = goalDiv.querySelector("ol");
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

function hideGuys() {
  document.querySelector("#guy-container").setAttribute("class", "hidden");
}

function showCharacters() {
  document.querySelector("#guy-container").removeAttribute("class", "hidden");
  const hideGuysBtn = document.createElement("button");
  hideGuysBtn.innerText = "Hide Guys";
  document.getElementById("guy-container").append(hideGuysBtn);
  hideGuysBtn.addEventListener("click", function() {
    hideGuys();
  });
}

function displayInfoPopUp() {
  const infoDiv = document.querySelector("#info-popup");
  infoDiv.classList.remove("hidden");

  // secret character display button
  const charButton = document.createElement("button");
  charButton.innerText = "???";
  infoDiv.append(charButton);
  charButton.addEventListener("click", showCharacters);
  //

  infoDiv.querySelector("#exit-popup").addEventListener("click", exitPopUp);
  infoDiv.querySelector("#add-more-inputs").addEventListener("click", addPriorityInput);
  infoDiv.querySelector("#priority-list").addEventListener('submit', function (e) {
    displayPrioritiesList(e);
    exitPopUp();
  });
}

// Reset Buttons


function priorityReset() {
  const goalList = document.getElementById("goal-list");
  const priorityList = document.getElementById("priority-list");
  goalList.querySelector("ol").innerText = null;
  priorityList.querySelector("ol").innerText = null;

}

function setPriorityReset() {
  const priorityResetButton = document.createElement("button");
  priorityResetButton.innerText = "Reset Goals";
  priorityResetButton.classList = "priorityResetButton";
  document.getElementById("goal-list").append(priorityResetButton);
  priorityResetButton.addEventListener("click", function () {
    priorityReset();
  });
}


function dayReset(dayDiv) {
  document.getElementById(`${dayDiv}`).remove();
}

function setDayReset(dayDiv) {
  const dayResetButton = document.createElement("button");
  dayResetButton.innerHTML = "&#10005;";
  dayResetButton.classList = "dayResetButton";
  document.getElementById(dayDiv).firstChild.append(dayResetButton);
  dayResetButton.addEventListener("click", function () {
    dayReset(dayDiv);
  });
}


function weekReset() {
  document.getElementById("week").innerHTML = null;
}

function setWeekReset() {

  const weekResetButton = document.createElement("button");
  weekResetButton.innerText = "Reset Week";
  weekResetButton.classList = "weekResetButton";
  document.getElementById("week").after(weekResetButton);
  weekResetButton.addEventListener("click", function () {
    weekReset();
  });
}




// Onload

window.addEventListener("load", function () {
  document.querySelector("#free-time-form").addEventListener("submit", handleFormSubmission);
  this.document.querySelector("#info").addEventListener("click", displayInfoPopUp);
  this.document.getElementById("profileBtn").addEventListener("click", saveUser);
  this.document.getElementById("newUser").addEventListener("click", newUser);
  this.document.getElementById("existingUser").addEventListener("click", existingUser);
});