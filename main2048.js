let board = [];
let score = 0;
let hasConflict = [];

window.onload = function(){
    newGame();
};
function newGame(){
    //初始化棋盘格
    init();
    //随机生成两个数字
    generateOneNumber();
    generateOneNumber();
}

//初始化函数
function init() {
    //初始化棋盘格
    for(let i = 0;i < 4;i++){
        for(let j = 0;j < 4;j++){
            let gridCell = document.getElementById("grid-cell" + "-" + i + "-" + j);
            //console.log(gridCell);
            gridCell.style.left = getPosLeft(i,j) + "px";
            gridCell.style.top = getPosTop(i,j) + "px";
        }
    }
   //初始化棋盘格的数字
   for(let i = 0;i < 4;i++){
       board[i] = [];
       hasConflict[i] = [];
       for(let j = 0;j < 4;j++){
           board[i][j] = 0;
           hasConflict[i][j] = false;
       }
   }
   updateBoardView();
   score = 0;
}


//创建16个numberCell,把numberCell添加到棋盘格上
function updateBoardView(){
    let gridContainer = document.getElementById("grid-container");
    //删除已经存在的numberCell
    let numberCell = document.getElementsByClassName("number-cell");
    for(let i = (numberCell.length-1);i >= 0;i--){
        gridContainer.removeChild(numberCell[i]);
    }


    for(let i = 0;i < 4;i++){
        for(let j = 0;j < 4;j++){
            let cellNumber = document.createElement("div");
            cellNumber.setAttribute("class","number-cell");
            cellNumber.setAttribute("id","number-cell"+"-"+i+"-"+j);
            gridContainer.appendChild(cellNumber);

            let theNumberCell = document.getElementById("number-cell"+"-"+i+"-"+j);
            if(board[i][j] === 0){
                theNumberCell.style.width = 0 + "px";
                theNumberCell.style.height = 0 + "px";
                theNumberCell.style.left = getPosLeft(i,j) + 50 + "px";
                theNumberCell.style.top = getPosTop(i,j) + 50 + "px";
            }else{
                theNumberCell.style.width = 100 + "px";
                theNumberCell.style.height = 100 + "px";
                theNumberCell.style.left = getPosLeft(i,j) + "px";
                theNumberCell.style.top = getPosTop(i,j) + "px";
                theNumberCell.style.backgroundColor = getNumberBackgroundColor(board[i][j]);
                theNumberCell.style.color = getNumberColor(board[i][j]);

                //显示数字值S
                let theNumberText = document.createTextNode(board[i][j]);
                theNumberCell.appendChild(theNumberText);
            }
            hasConflict[i][j] = false;
        }
    }
}

//随机生成数字的函数
function generateOneNumber(){
    //判断棋盘格是否还有空间
    if(noSpace(board)){
        return false;
    }

    //随机位置
    let randx = parseInt(Math.floor(Math.random()*4));
    let randy = parseInt(Math.floor(Math.random()*4));
    while(true){
        if(board[randx][randy] === 0){
            break;
        }else{
            randx = parseInt(Math.floor(Math.random()*4));
            randy = parseInt(Math.floor(Math.random()*4));
        }
    }
    //随机数字
    let randNumber = Math.random() < 0.5 ? 2 : 4;

    //在随机位置上显示随机数
    board[randx][randy] = randNumber;
    showNumberAnimation(randx,randy,randNumber);
    return true;
}

//绑定方向键的响应函数
document.onkeydown = function(event){
    switch(event.keyCode){
        case 65:
            if(moveLeft()){
                generateOneNumber();
                isGameOver();
        }
            break;
        case 68:
            if(moveRight()){
            generateOneNumber();
            isGameOver();
        }
            break;
        case 87:
            if(moveUp()){
            generateOneNumber();
            isGameOver();
        }
            break;
        case 83:
            if(moveDown()){
                generateOneNumber();
                isGameOver();
            }
            break;
        default:
            break;
    }
}

//创建向左移动的函数
function moveLeft(){
    if(!canMoveLeft(board)){
        return false;
    }
    //move left
    for(let i = 0;i < 4;i++){
        for(let j = 1;j < 4;j++){
            if(board[i][j] !== 0){
                for(let k = 0;k < j;k++){
                    if(board[i][k] === 0 && noBlockHorizontal(i,k,j,board)){
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }else if(board[i][k] === board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflict[i][k]){
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j] + board[i][k];
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore(score);

                        hasConflict[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    updateBoardView();
    return true;
}

function moveRight() {
    if(!canMoveRight(board)){
        return false;
    }
    for(let i = 0;i < 4;i++){
        for(let j = 2;j >= 0;j--){
            if(board[i][j] !== 0){
                for(let k = 3;k > j;k--){
                    if(board[i][k] === 0 && noBlockHorizontal(i,j,k,board)){
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }else if(board[i][k] === board[i][j] && noBlockHorizontal(i,j,k,board) && !hasConflict[i][k]) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j] + board[i][k];
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore(score);

                        hasConflict[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }

    updateBoardView();
    return true;
}

function moveUp(){
    if(!canMoveUp(board)){
        return false;
    }
    for(let i = 1;i < 4;i++){
        for(let j = 0;j < 4;j++){
            if(board[i][j] !== 0){
                for(let k = 0;k < i;k++){
                    if(board[k][j] === 0 && noBlockVertical(j,k,i,board)){
                        showMoveAnimation(i,j,i,k);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }else if(board[k][j] === board[i][j] && noBlockVertical(j,k,i,board) && !hasConflict[k][j]){
                        showMoveAnimation(i,j,i,k);
                        board[k][j] = board[k][j] + board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        updateScore(score);

                        hasConflict[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }

    updateBoardView();
    return true;
}

function moveDown() {
    if(!canMoveDown(board)){
        return false;
    }
    for(let i = 2;i >= 0;i--){
        for(let j = 0;j < 4;j++){
            if(board[i][j] !== 0){
                for(let k = 3;k > i;k--){
                    if(board[k][j] === 0 && noBlockVertical(j,i,k,board)){
                        showMoveAnimation(i,j,i,k);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }else if(board[k][j] === board[i][j] && noBlockVertical(j,i,k,board) && !hasConflict[k][j]){
                        showMoveAnimation(i,j,i,k);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        updateScore(score);

                        hasConflict[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }

    updateBoardView();
    return true;
}

function isGameOver(board) {
    if(noSpace(board) && noMove(board)){
        gameOver();
    }
}

function gameOver() {
    alert("game over");
}