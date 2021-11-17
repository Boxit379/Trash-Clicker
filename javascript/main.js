var trashRemoved = 0;
var totalTrashRemoved = 0;
var trashTimer = -1;
var timerMax = 500;
var glovesCost = 5;

var savegame = JSON.parse(localStorage.getItem("save"));
if (savegame != null) {
  if (typeof savegame.trashRemoved !== "undefined") trashRemoved = savegame.trashRemoved;
  if (typeof savegame.totalTrashRemoved !== "undefined") totalTrashRemoved = savegame.totalTrashRemoved;
  if (typeof savegame.timerMax !== "undefined") timerMax = savegame.timerMax;
  if (typeof savegame.glovesCost !== "undefined") timerMax = savegame.glovesCost;
}

$("#upgradesTab").hide();
$("#shopTab").hide();
hideCheck();

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

function saveGame() {
  var save = {
    trashRemoved: trashRemoved,
    totalTrashRemoved: totalTrashRemoved,
    timerMax: timerMax,
    glovesCost: glovesCost
  }
  localStorage.setItem("save",JSON.stringify(save));
}

function hideCheck() {
  if (totalTrashRemoved >= 3) {
    $("#upgradesTab").show();
  }
  if (totalTrashRemoved >= 8) {
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
  hideCheck();
}, 10);
