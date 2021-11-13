var trashRemoved = 0;

function removeTrash(trashAmount){
    trashRemoved = trashRemoved + trashAmount;
    document.getElementById("trashCounter").innerHTML = trashRemoved; 
};
