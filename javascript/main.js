var trashRemoved = 0;
var totalTrashRemoved = 0;
var trashTimer = -1;
var timerMax = 500;

var savegame = JSON.parse(localStorage.getItem("save"));
if (savegame != null) {
  if (typeof savegame.trashRemoved !== "undefined") trashRemoved = savegame.trashRemoved;
  if (typeof savegame.totalTrashRemoved !== "undefined") totalTrashRemoved = savegame.totalTrashRemoved;
  if (typeof savegame.timerMax !== "undefined") timerMax = savegame.timerMax;
}

$("#upgradesTab").hide();
hideCheck();

function removeTrash(){
  if (trashTimer == -1) {
    trashTimer = 0;
  }
}

function saveGame() {
  var save = {
    trashRemoved: trashRemoved,
    totalTrashRemoved: totalTrashRemoved,
    timerMax: timerMax
  }
  localStorage.setItem("save",JSON.stringify(save));
}

function hideCheck() {
  if (totalTrashRemoved >= 3) {
    $("#upgradesTab").show();
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
  hideCheck();
}, 10);
