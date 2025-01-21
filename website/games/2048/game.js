var board = document.getElementById('board');
var resetButton = document.getElementById('reset-button');
var gridSize = 4;
var gameBoard;
var score = 0;
var gameOver;


function initGameBoard(){
    gameBoard = []
    for(var i=0;i<gridSize;i++){
      gameBoard[i]=[];
      for(var j=0;j<gridSize;j++){
            gameBoard[i][j]=null;
        }
    }
}

function addGridSize(){
    gridSize++;
    document.getElementById('grid-size').innerHTML=gridSize;
    resetGame();
}

function subGridSize(){
    if(gridSize>3){
        gridSize--;
        document.getElementById('grid-size').innerHTML=gridSize;
        resetGame();
    }
}

function drawCell(row, col, tileValue) {
    var cell = document.createElement('div');
    cell.classList.add('tile', `tile-${tileValue}`);
    if(tileValue!=null){
        var content = document.createTextNode(tileValue);
        cell.appendChild(content);
    }
    return cell;
}

function updateBoardUI() {
    board.innerHTML = '';
    console.log(gameBoard)
    board.style.setProperty('--grid-size', gridSize);
    for (var row = 0; row < gridSize; row++) {
        for (var col = 0; col < gridSize; col++) {
            var cell = drawCell(row, col, gameBoard[row][col]);
            board.appendChild(cell);
        }
    }
}

function createRandomCell(){
    if(gameOver)
        return;
    var row;
    var col;
    do{
        row=Math.floor(Math.random() * gridSize)
        col=Math.floor(Math.random() * gridSize)
    }while(gameBoard[row][col]!=null)
    //console.log(Math.floor(Math.random() * 1));
    gameBoard[row][col]=2* (Math.floor(Math.random() * 2) + 1);
    //console.log(row + " "+ col);
}

document.addEventListener('keydown', function (event) {
    if(gameOver)
        return;
    if (event.key === 'ArrowUp') {
        moveTilesUp();
    } else if (event.key === 'ArrowDown') {
        moveTilesDown();
    } else if (event.key === 'ArrowLeft') {
        moveTilesLeft();
    } else if (event.key === 'ArrowRight') {
        moveTilesRight();
    }else{
        return;
    }
    gameover();
    createRandomCell();
    updateBoardUI();
});

function moveTilesUp(){
    for(var i=0;i<gridSize;i++){
        for(var j=0;j<gridSize;j++){
            if(gameBoard[i][j]!=null){
                newRow=i;
                while(newRow>0 && newRow-1!==-1 && gameBoard[newRow-1][j]==null)
                    newRow--;
                var a = gameBoard[i][j];
                gameBoard[i][j]=null;
                gameBoard[newRow][j]=a;
                if(newRow-1!==-1 && gameBoard[newRow-1][j]==gameBoard[newRow][j]){
                    gameBoard[newRow-1][j]*=2;
                    gameBoard[newRow][j]=null;
                    score+=gameBoard[newRow-1][j];
                    updateScore();
                }
            }
        }
    }
}

function moveTilesDown(){
    for(var i=gridSize-1;i>=0;i--){
        for(var j=0;j<gridSize;j++){
            if(gameBoard[i][j]!=null){
                newRow=i;
                while(newRow<gridSize && newRow+1!==gridSize && gameBoard[newRow+1][j]==null)
                    newRow++;
                var a = gameBoard[i][j];
                gameBoard[i][j]=null;
                gameBoard[newRow][j]=a;
                if(newRow+1!==gridSize && gameBoard[newRow+1][j]==gameBoard[newRow][j]){
                    gameBoard[newRow+1][j]*=2;
                    gameBoard[newRow][j]=null;
                    score+=gameBoard[newRow+1][j];
                    updateScore();
                }
            }
        }
    }
}

function moveTilesLeft(){
    for(var i=0;i<gridSize;i++){
        for(var j=0;j<gridSize;j++){
            if(gameBoard[i][j]!=null){
                newCol=j;
                while(newCol>0 && newCol-1!==-1 && gameBoard[i][newCol-1]==null)
                    newCol--;
                var a = gameBoard[i][j];
                gameBoard[i][j]=null;
                gameBoard[i][newCol]=a;
                if(newCol-1!==-1 && gameBoard[i][newCol-1]==gameBoard[i][newCol]){
                    gameBoard[i][newCol-1]*=2;
                    gameBoard[i][newCol]=null;
                    score+=gameBoard[i][newCol-1];
                    updateScore();
                }
            }
        }
    }
}

function moveTilesRight(){
    for(var i=0;i<gridSize;i++){
        for(var j=gridSize-1;j>=0;j--){
            if(gameBoard[i][j]!=null){
                newCol=j;
                while(newCol<gridSize && newCol+1!==gridSize && gameBoard[i][newCol+1]==null)
                    newCol++;
                var a = gameBoard[i][j];
                gameBoard[i][j]=null;
                gameBoard[i][newCol]=a;
                if(newCol+1!==gridSize && gameBoard[i][newCol+1]==gameBoard[i][newCol]){
                    gameBoard[i][newCol+1]*=2;
                    gameBoard[i][newCol]=null;
                    score+=gameBoard[i][newCol+1];
                    updateScore();
                }
            }
        }
    }
}

function updateScore(){
    document.getElementById('score').innerHTML = "Score: "+score;
}

function isGameover(){
    for(var i=0;i<gridSize;i++){
        for(var j=0;j<gridSize;j++){
            if(gameBoard[i][j]==null){
                gameOver=false;
                return false;
            }
        }
    }
    gameOver=true;
    return true;
}

function gameover(){
    if(isGameover())
        alert("Game over!");
}

function resetGame(){
    document.getElementById('grid-size').innerHTML=gridSize;
    score=0;
    updateScore();
    initGameBoard();
    gameOver=false;
    for(var i=1;i<Math.random() * 2+1;i++)
        createRandomCell();
    updateBoardUI();
}

resetGame();
resetButton.addEventListener('click', resetGame);

