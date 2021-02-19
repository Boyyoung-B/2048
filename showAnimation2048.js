function showNumberAnimation(i,j,randNumber){
    let numberCell = document.getElementById("number-cell"+"-"+i+"-"+j);
    numberCell.style.backgroundColor = getNumberBackgroundColor(randNumber);
    numberCell.style.color = getNumberColor(randNumber);

    let numText = document.createTextNode(randNumber);
    numberCell.appendChild(numText);

    numberCell.style.width = 100 + "px";
    numberCell.style.height = 100 + "px";
    numberCell.style.left = getPosLeft(i,j) + "px";
    numberCell.style.top = getPosTop(i,j) + "px";
    numberCell.style.backgroundColor = getNumberBackgroundColor(randNumber);
    numberCell.style.color = getNumberColor(randNumber);

}

function showMoveAnimation(fromx,fromy,tox,toy) {
    let numberCell = document.getElementById("number-cell"+"-"+fromx+"-"+fromy);
    numberCell.style.left = getPosLeft(tox,toy);
    numberCell.style.top = getPosTop(tox,toy);

}

function updateScore(score) {
    let scoreText = document.getElementById("score");
    scoreText.innerHTML = score;
}