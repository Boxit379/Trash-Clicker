var trashRemoved = 0;
var totalTrashRemoved = 0;
var trashTimer = -1;
var timerMax = 500;

function removeTrash(){
  if (trashTimer == -1) {
    trashTimer = 0;
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
  document.getElementById("trashProgress").value = trashTimer;
}, 10);
