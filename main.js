const getBoxes = (() => {
    const arr = [];
    const boxes = document.querySelectorAll(".box > div");
    boxes.forEach((box, index) => {
        
        arr[index] = box;
        
        
    });
    return (arr);
})();

const getClickFields =(() => {

    const fields = document.querySelectorAll(".box");
    
   return {fields};

})();

const getRadioButtons = (() => {
    const radioButtons = document.querySelectorAll('input[type = "radio"]');
    return {radioButtons};
})();



const getStartPlayer = () => {
    const startPlayer = Math.floor(Math.random()* (3-1) + 1);
    return (startPlayer);
};




const gameBoard = (() => {
    const gameBoardArr = ["", "", "", "", "", "", "", "", ""];
    return {gameBoardArr};
})();

const renderToPage = (gameBoard, getBoxes) => {
    for(let i=0; i<9; i++){
        getBoxes[i].innerHTML = gameBoard[i];
    }
};


const player = (name, sign) => {
    
    return {name, sign};
};



const getInput = () => {
    const playerone = document.querySelector("#player1");
    const playertwo = document.querySelector("#player2");
    
    
    let name1 = '';
    let name2 = '';
    let symbol1 = '';
    let symbol2 = '';
    
    name1 = playerone.value;
    
    name2 = playertwo.value;
    
    symbol1 = document.querySelector('input[name="player1symb"]:checked').value;

    symbol2 = document.querySelector('input[name="player2symb"]:checked').value;
        
    
    return {name1, name2, symbol1, symbol2};

};

const gameOver = (() => {
    const text = document.createElement('p');
    text.setAttribute('class', 'text');
    const divToInsertAfter = document.getElementById('gameboard');
    divToInsertAfter.parentNode.insertBefore(text, divToInsertAfter.nextSibling);
    const setText = (currentSymbol) => {
        if (currentSymbol === getInput().symbol1){
            text.innerHTML = `Game over. ${getInput().name1} wins.`;
        }
        else if (currentSymbol === getInput().symbol2){
            text.innerHTML = `Game over. ${getInput().name2} wins.`;
        }
        else {
            text.innerHTML = `Game over. It's a draw.`;
        }
        document.getElementById('turn').parentNode.removeChild(document.getElementById('turn'));
    }

    return {setText};
})();

function checkForEmptyRows(start) {
    
    let j = 0;
    for (let i = start; i < start+3; i++){
        if(gameBoard.gameBoardArr[i] === ''){
            j++;
            console.log('alert1');
        }
    }
    return j === 3;
    
    
};

function checkForEmptyCollumns(start) {
    
    let j = 0;
    for (let i = start; i < start+7; i += 3){
        if(gameBoard.gameBoardArr[i] === ''){
            j++;
            console.log('alert2');
        }
    }
    return j === 3;
    
    
};

 function checkForEmptyDiagonal1 (start){
    
    let j = 0;
    for (let i = start; i < 9; i += 4){
        if(gameBoard.gameBoardArr[i] === ''){
            j++;
            console.log('alert3');
        }
    }
    return j === 3;
    
    
};

function checkForEmptyDiagonal2(start)  {
    
    let j = 0;
    for (let i = start; i < 7; i += 2){
        if(gameBoard.gameBoardArr[i] === ''){
            j++;
            console.log('alert4');
        }
    }
    return j === 3;
    
    
};



const checkForWinner = () => {
    
    if (gameBoard.gameBoardArr[0] === gameBoard.gameBoardArr[1] && gameBoard.gameBoardArr [0] === gameBoard.gameBoardArr [2] && !checkForEmptyRows(0)){
        gameOver.setText(gameBoard.gameBoardArr[0]);
    }

    else if (gameBoard.gameBoardArr[3] === gameBoard.gameBoardArr[4] && gameBoard.gameBoardArr [3] === gameBoard.gameBoardArr [5] && !checkForEmptyRows(3)){
        gameOver.setText(gameBoard.gameBoardArr[3]);
    }

    else if (gameBoard.gameBoardArr[6] === gameBoard.gameBoardArr[7] && gameBoard.gameBoardArr [6] === gameBoard.gameBoardArr [8] && !checkForEmptyRows(6)){
        gameOver.setText(gameBoard.gameBoardArr[6]);
    }
    else if (gameBoard.gameBoardArr[0] === gameBoard.gameBoardArr[3] && gameBoard.gameBoardArr [0] === gameBoard.gameBoardArr [6] && !checkForEmptyCollumns(0)){
        gameOver.setText(gameBoard.gameBoardArr[0]);
    }
    else if (gameBoard.gameBoardArr[1] === gameBoard.gameBoardArr[4] && gameBoard.gameBoardArr [1] === gameBoard.gameBoardArr [7] && !checkForEmptyCollumns(1)){
        gameOver.setText(gameBoard.gameBoardArr[1]);
    }
    else if (gameBoard.gameBoardArr[2] === gameBoard.gameBoardArr[5] && gameBoard.gameBoardArr [2] === gameBoard.gameBoardArr [8] && !checkForEmptyCollumns(2)){
        gameOver.setText(gameBoard.gameBoardArr[2]);
    }
    else if (gameBoard.gameBoardArr[0] === gameBoard.gameBoardArr[4] && gameBoard.gameBoardArr [0] === gameBoard.gameBoardArr [8] && !checkForEmptyDiagonal1(0)){
        gameOver.setText(gameBoard.gameBoardArr[0]);
    }
    else if (gameBoard.gameBoardArr[2] === gameBoard.gameBoardArr[4] && gameBoard.gameBoardArr [2] === gameBoard.gameBoardArr [6] && !checkForEmptyDiagonal2(2)){
        gameOver.setText(gameBoard.gameBoardArr[2]);
    }

    else if (!gameBoard.gameBoardArr.includes('')){
        gameOver.setText('Noone');
    }

    
    
};


const outer = (() => {
   
    const currentPlayer = Number(getStartPlayer());
    
    
    const handleEvent = (event) => {
        
        
        
        
        
        const clickedField = event.currentTarget.getAttribute('data');
        
        if (outer.currentPlayer === 1){
            gameBoard.gameBoardArr[clickedField-1] = getInput().symbol1;
            
            
            renderToPage(gameBoard.gameBoardArr, getBoxes);
            outer.currentPlayer = 2;
            
        }
        else if (outer.currentPlayer === 2){
            gameBoard.gameBoardArr[clickedField-1] = getInput().symbol2;
            
            
            renderToPage(gameBoard.gameBoardArr, getBoxes);
            outer.currentPlayer = 1;
            
        }
        event.currentTarget.removeEventListener('click', handleEvent);
        
        checkForWinner();  
        
    };

      
    
        return {handleEvent, currentPlayer};
})();

const switchButtons = (event) => {
    if (document.querySelector('input[name="player1symb"]:checked').value === 'x' && event.target.getAttribute('name') === 'player1symb'){
        document.querySelector('input[id="player2symbo"]').checked = true;
        document.querySelector('input[id="player2symbx"]').checked = false;
        
    }
    else if (document.querySelector('input[name="player1symb"]:checked').value === 'o' && event.target.getAttribute('name') === 'player1symb') {
        document.querySelector('input[id="player2symbx"]').checked = true;
        document.querySelector('input[id="player2symbo"]').checked = false;
       
    }

    else if (document.querySelector('input[name="player2symb"]:checked').value === 'x' && event.target.getAttribute('name') === 'player2symb'){
        document.querySelector('input[id="player1symbo"]').checked = true;
        document.querySelector('input[id="player1symbx"]').checked = false;
    }
    else if (document.querySelector('input[name="player2symb"]:checked').value === 'o' && event.target.getAttribute('name') === 'player2symb') {
        document.querySelector('input[id="player1symbx"]').checked = true;
        document.querySelector('input[id="player1symbo"]').checked = false;
       
    }
};




getRadioButtons.radioButtons.forEach((button) => {
button.addEventListener('change', switchButtons);
});

const displayText = (() => {
    const text = document.createElement('p');
    text.setAttribute('class', 'text');
    text.setAttribute('id', 'turn');
    const divToInsertBefore= document.getElementById('gameboard');
    divToInsertBefore.parentNode.insertBefore(text, divToInsertBefore);
    const setText = (currentPlayer) => {
        text.innerHTML = `${currentPlayer}, it's your turn.`;
        
    }
    return {setText};
})();





const playButton = document.getElementById('play');
playButton.addEventListener('click', (event) => {
    event.preventDefault();
    const player1 = player(getInput().name1, getInput().symbol1);
    const player2 = player(getInput().name2, getInput().symbol2);
    
    const check2 = (parameter1, parameter2) =>{
        return (event) => {
           
            if(outer.currentPlayer === 1){
                displayText.setText(parameter1);
                
            }
            else if (outer.currentPlayer === 2){
                displayText.setText(parameter2);
                
                
            }  
            
            event.currentTarget.removeEventListener('click', checkHandler);
        }
        
    }

    const checkHandler = check2(player1.name, player2.name);
    
    getClickFields.fields.forEach((field) => {
        field.addEventListener('click', outer.handleEvent);
        
    });
    getClickFields.fields.forEach((field) => {
        field.addEventListener('click', checkHandler);
            
       
        
    });

    if (outer.currentPlayer === 1){
        displayText.setText(player1.name);
    }
    else {
        displayText.setText(player2.name);
    }
    
    
});







