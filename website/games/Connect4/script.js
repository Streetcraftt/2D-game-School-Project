try {
    var board = document.getElementById('board');
    var resetButton = document.getElementById('reset-button');
    var difficultyForm=document.getElementById('difficulty');
    var difficulty;
    var rows = 6;
    var cols = 7;
    var player='red';
    var gameBoard
    var isGameover=false;


    function initGameBoard(){
        gameBoard = []
        for(var i=0;i<rows;i++){
          gameBoard[i]=[];
          for(var j=0;j<cols;j++){
                gameBoard[i][j]=null;
            }
        }
    }

    function createCell(row, col) {
        var cell = document.createElement('div');
        cell.classList.add('board-cell');
        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.addEventListener('click', () => onCellClick(row,col))
        return cell;
    }

    function updateBoardUI() {
        board.innerHTML = '';
        //console.log(gameBoard)
        for (var row = 0; row < rows; row++) {
            for (var col = 0; col < cols; col++) {
                var cell = createCell(row, col);
                cell.style.backgroundColor = gameBoard[row][col];
                board.appendChild(cell);
            }
        }
        console.log("board updated");
    }
    
    function onCellClick(row,col){
        if(isGameover)
            return;
        if(!placeNewToken(col))
            return;
        checkWin(newRow,col);
        if(difficulty!=0){
            AIturn();
            updateBoardUI();
            return;
        }
        updateBoardUI();
    }

    function placeNewToken(col){
        newRow=rows-1;
        while(newRow>0 && gameBoard[newRow][col]!==null){
            newRow--;
        }
        if(gameBoard[newRow][col]!=null){
            return false;
        }
        gameBoard[newRow][col]=player;

        if(player=='red')
            player='yellow';
        else if(player=='yellow')
            player='red';
        return true;
    }

    function AIturn(){
        switch (difficulty) {
            case "1": AIone(); break;
            case "2": AItwo(); break;
            default: break;
        }
    }

    function AIone(){
        while(!placeNewToken(Math.floor(Math.random() * cols)));
    }
    
    function AItwo(){
        //placeNewToken(Math.floor(Math.random() * cols));
    }

    function onDifficultyChanged(){
        difficulty=difficultyForm.options[difficultyForm.selectedIndex].id;
        console.log(difficulty);
        resetGame();
    }

    function checkWin(row, col){
        var p='red';
        var win=0;
        for(var i=0;i<rows;i++){
            if(gameBoard[i][col]==null)
                win=0;
            else if(gameBoard[i][col]=='red'&&p=='red'){
                win++;
            }else if(gameBoard[i][col]=='yellow' && p=='red'){
                p='yellow'
                win=1;
            }else if(gameBoard[i][col]=='yellow'&&p=='yellow'){
                win++;
            }else if(gameBoard[i][col]=='red' && p=='yellow'){
                p='red'
                win=1;
            }
            if(win>3){
                GameWon(p);
                //console.log(p+" won");
            }
        }
        
        p='red';
        win=0;
        for(var i=0;i<cols;i++){
            if(gameBoard[row][i]==null)
                win=0;
            else if(gameBoard[row][i]=='red'&&p=='red'){
                win++;
            }else if(gameBoard[row][i]=='yellow' && p=='red'){
                p='yellow'
                win=1;
            }else if(gameBoard[row][i]=='yellow'&&p=='yellow'){
                win++;
            }else if(gameBoard[row][i]=='red' && p=='yellow'){
                p='red'
                win=1;
            }
            if(win>3){
                GameWon(p);
                //console.log(p+" won");
            }
        }

        p='red';
        win=0;
        newRow=row;
        newCol=col;
        while(newRow!==0 && newCol!==0){
            newRow--;
            newCol--;
        }
        var count=0;
        while(newRow+count!==rows && newCol+count!==cols){
        //for(var i=0;i<newCol;i++){
            if(gameBoard[newRow+count][newCol+count]==null)
                win=0;
            else if(gameBoard[newRow+count][newCol+count]=='red'&&p=='red'){
                win++;
            }else if(gameBoard[newRow+count][newCol+count]=='yellow' && p=='red'){
                p='yellow'
                win=1;
            }else if(gameBoard[newRow+count][newCol+count]=='yellow'&&p=='yellow'){
                win++;
            }else if(gameBoard[newRow+count][newCol+count]=='red' && p=='yellow'){
                p='red'
                win=1;
            }
            if(win>3){
                GameWon(p);
                //console.log(p+" won");
            }
            count++;
        }

        p='red';
        win=0;
        newRow=row;
        newCol=col;
        while(newRow!==rows-1 && newCol!==0){
            newRow++;
            newCol--;
        }
        count=0;
        //console.log(newRow+" "+newCol);
        while(newRow-count!==0 && newCol+count!==cols){
            if(gameBoard[newRow-count][newCol+count]==null)
                win=0;
            else if(gameBoard[newRow-count][newCol+count]=='red'&&p=='red'){
                win++;
            }else if(gameBoard[newRow-count][newCol+count]=='yellow' && p=='red'){
                p='yellow'
                win=1;
            }else if(gameBoard[newRow-count][newCol+count]=='yellow'&&p=='yellow'){
                win++;
            }else if(gameBoard[newRow-count][newCol+count]=='red' && p=='yellow'){
                p='red'
                win=1;
            }
            if(win>3){
                GameWon(p);
                //console.log(p+" won");
            }
            count++;
        }

    }

    function GameWon (p){
        if(isGameover)
            return;
        console.log(p+" won");
        isGameover=true;
        alert("the "+p+" player won");
        
    }

    function resetGame() {
        isGameover=false;
        player='red';
        initGameBoard();
        updateBoardUI();
    }

    resetButton.addEventListener('click', resetGame);
    difficultyForm.addEventListener("change", onDifficultyChanged);
    onDifficultyChanged();

} catch (error) {
    console.error("Caught an error: " + error.message);
}
