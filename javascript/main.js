var trashRemoved = 0;
var totalTrashRemoved = 0;
var trashTimer = -1;
var timerMax = 500;
var glovesCost = 5;
var workers = 0;

var savegame = JSON.parse(localStorage.getItem("save"));
if (savegame != null) {
  if (typeof savegame.trashRemoved !== "undefined") trashRemoved = savegame.trashRemoved;
  if (typeof savegame.totalTrashRemoved !== "undefined") totalTrashRemoved = savegame.totalTrashRemoved;
  if (typeof savegame.timerMax !== "undefined") timerMax = savegame.timerMax;
  if (typeof savegame.glovesCost !== "undefined") glovesCost = savegame.glovesCost;
  if (typeof savegame.workers !== "undefined" workers = savegame.workers);
}

$("#upgradesTab").hide();
$("#shopTab").hide();
showCheck();

function removeTrash(){
  if (trashTimer == -1) {
    trashTimer = 0;
  }
}

function upgradeGloves(){
  if (trashRemoved >= glovesCost) {
    timerMax -= 100;
    trashRemoved -= glovesCost;
    glovesCost *= glovesCost;
    document.getElementById("glovesCost").innerHTML = glovesCost;
  }
}

function buyWorker(){
  if (trashRemoved >= workerCost) {
    workers += 1;
    trashRemoved -= workerCost;
    workerCost *= 1.2
    document.getElementById("glovesCost").innerHTML = glovesCost;
  }
}

function saveGame() {
  var save = {
    trashRemoved: trashRemoved,
    totalTrashRemoved: totalTrashRemoved,
    timerMax: timerMax,
    glovesCost: glovesCost,
    workers: workers
  }
  localStorage.setItem("save",JSON.stringify(save));
}

function showCheck() {
  if (totalTrashRemoved >= 3) {
    $("#upgradesTab").show();
  }
  if (totalTrashRemoved >= 6 && timerMax <= 400) {
    $("#shopTab").show();
  }
}

window.setInterval(function(){
  if (trashTimer < timerMax && trashTimer >= 0) {
    trashTimer += 1;
  }
  else if (trashTimer >= timerMax) {
    trashTimer = -1;
    trashRemoved += 1;
    totalTrashRemoved += 1;
  }
  document.getElementById("trashCounter").innerHTML = trashRemoved;
  //document.getElementById("totalTrashCounter").innerHTML = totalTrashRemoved;
  document.getElementById("trashProgress").value = trashTimer;
  document.getElementById("trashProgress").max = timerMax;
  document.getElementById("glovesCost").innerHTML = glovesCost;
  showCheck();
}, 10);
