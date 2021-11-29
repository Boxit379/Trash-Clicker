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
  if (typeof savegame.workers !== "undefined") workers = savegame.workers;
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
  if (trashRemoved >= glovesCost && timerMax > 100) {
    timerMax -= 100;
    trashRemoved -= glovesCost;
    glovesCost *= glovesCost;
  }
}

function buyWorker(){
  var workerCost = Math.floor(8 * Math.pow(1.1,workers));
  if (trashRemoved >= workerCost) {
    workers += 1;
    trashRemoved -= workerCost;
  }
  var nextCost = Math.floor(10 * Math.pow(1.1,workers))
  document.getElementById('workerCost').innerHTML = nextCost;
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

function resetGame() {
  localStorage.removeItem("save");
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
  var totalIncrease = workers / timerMax;
  trashRemoved += totalIncrease;
  document.getElementById("trashCounter").innerHTML = trashRemoved.toFixed(2);
  //document.getElementById("totalTrashCounter").innerHTML = totalTrashRemoved;
  document.getElementById("trashProgress").value = trashTimer;
  document.getElementById("trashProgress").max = timerMax;
  if (timerMax > 100) {
    document.getElementById("glovesCost").innerHTML = glovesCost + "lbs. of trash";
  } else {
    document.getElementById("glovesCost").innerHTML = "Max Level";
  }
  showCheck();
}, 10);
