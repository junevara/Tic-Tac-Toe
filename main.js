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

const getRadioButtons1 = (() => {
    const radioButtons = document.querySelectorAll('input[type = "radio"].chooseSymbol');
    return {radioButtons};
})();

const getRadioButtons2 = (() => {
    const radioButtons = document.querySelectorAll('input[type = "radio"].chooseMo');
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

const onLoad = (() => {
    const disableFieldOnLoad = () => {
    const nodes = document.getElementById("player2Input").getElementsByTagName('*');
        for(let i = 0; i < nodes.length; i++){
            nodes[i].disabled = true;
        }
    }
    return {disableFieldOnLoad};
})();

onLoad.disableFieldOnLoad();



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


const reset = () => {
    for (let i = 0; i < 9; i++){
        gameBoard.gameBoardArr[i] = '';
        getBoxes[i].innerHTML = '';
    }
    const playButton = document.getElementById('play');
    playButton.removeAttribute('disabled');
    document.getElementById('playAgainButton').parentNode.removeChild(document.getElementById('playAgainButton'))
    document.getElementById('gameOverMessage').parentNode.removeChild(document.getElementById('gameOverMessage'))
    checkForWinner.gameOverSwitch = false;
    outer.currentPlayer = getStartPlayer();
    outer.counter = 0;
    
    
}

const showPlayAgain = (() => {
    const preparePlayAgainButton = () => {
        const playAgainButoon = document.createElement('button');
        playAgainButoon.setAttribute('id', 'playAgainButton');
        playAgainButoon.innerHTML = 'replay';
        const divToInsertAfter = document.getElementById('gameOverMessage');
        divToInsertAfter.parentNode.insertBefore(playAgainButoon, divToInsertAfter.nextSibling);
        playAgainButoon.addEventListener('click', reset);
    }
    return {
        preparePlayAgainButton
    }
})();


const gameOver = (() => {
    
        
        const setText = (currentSymbol) => {
            const text = document.createElement('p');
            text.setAttribute('class', 'text');
            text.setAttribute('id', 'gameOverMessage');
            const divToInsertAfter = document.getElementById('gameboard');
            divToInsertAfter.parentNode.insertBefore(text, divToInsertAfter.nextSibling);
            
            
            if (document.querySelector('input[name="chooseMode"]:checked').value === 'twoPlayer'){
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
            else {
                if (currentSymbol === getInput().symbol1){
                    text.innerHTML = `Game over. ${getInput().name1} wins.`;
                }
                else if (currentSymbol !== getInput().symbol1 && currentSymbol !== 'Noone'){
                    text.innerHTML = `Game over. Computer wins.`;
                }
                else {
                    text.innerHTML = `Game over. It's a draw.`;
                }
                document.getElementById('turn').parentNode.removeChild(document.getElementById('turn'));
            }
            showPlayAgain.preparePlayAgainButton();
        }

        
    return {setText};
   
    
})();

function checkForEmptyRows(start) {
    
    let j = 0;
    for (let i = start; i < start+3; i++){
        if(gameBoard.gameBoardArr[i] === ''){
            j++;
            
        }
    }
    return j === 3;
    
    
};

function checkForEmptyCollumns(start) {
    
    let j = 0;
    for (let i = start; i < start+7; i += 3){
        if(gameBoard.gameBoardArr[i] === ''){
            j++;
            
        }
    }
    return j === 3;
    
    
};

 function checkForEmptyDiagonal1 (start){
    
    let j = 0;
    for (let i = start; i < 9; i += 4){
        if(gameBoard.gameBoardArr[i] === ''){
            j++;
            
        }
    }
    return j === 3;
    
    
};

function checkForEmptyDiagonal2(start)  {
    
    let j = 0;
    for (let i = start; i < 7; i += 2){
        if(gameBoard.gameBoardArr[i] === ''){
            j++;
            
        }
    }
    return j === 3;
    
    
};



const checkForWinner = () => {
    const gameOverSwitch = false;
    
    if (gameBoard.gameBoardArr[0] === gameBoard.gameBoardArr[1] && gameBoard.gameBoardArr [0] === gameBoard.gameBoardArr [2] && !checkForEmptyRows(0)){
        
        gameOver.setText(gameBoard.gameBoardArr[0]);
        checkForWinner.gameOverSwitch = true;
       
    }

    else if (gameBoard.gameBoardArr[3] === gameBoard.gameBoardArr[4] && gameBoard.gameBoardArr [3] === gameBoard.gameBoardArr [5] && !checkForEmptyRows(3)){
        gameOver.setText(gameBoard.gameBoardArr[3]);
        checkForWinner.gameOverSwitch = true;
    }

    else if (gameBoard.gameBoardArr[6] === gameBoard.gameBoardArr[7] && gameBoard.gameBoardArr [6] === gameBoard.gameBoardArr [8] && !checkForEmptyRows(6)){
        gameOver.setText(gameBoard.gameBoardArr[6]);
        checkForWinner.gameOverSwitch = true;
    }
    else if (gameBoard.gameBoardArr[0] === gameBoard.gameBoardArr[3] && gameBoard.gameBoardArr [0] === gameBoard.gameBoardArr [6] && !checkForEmptyCollumns(0)){
        gameOver.setText(gameBoard.gameBoardArr[0]);
        checkForWinner.gameOverSwitch = true;
    }
    else if (gameBoard.gameBoardArr[1] === gameBoard.gameBoardArr[4] && gameBoard.gameBoardArr [1] === gameBoard.gameBoardArr [7] && !checkForEmptyCollumns(1)){
        gameOver.setText(gameBoard.gameBoardArr[1]);
        checkForWinner.gameOverSwitch = true;
    }
    else if (gameBoard.gameBoardArr[2] === gameBoard.gameBoardArr[5] && gameBoard.gameBoardArr [2] === gameBoard.gameBoardArr [8] && !checkForEmptyCollumns(2)){
        gameOver.setText(gameBoard.gameBoardArr[2]);
        checkForWinner.gameOverSwitch = true;
    }
    else if (gameBoard.gameBoardArr[0] === gameBoard.gameBoardArr[4] && gameBoard.gameBoardArr [0] === gameBoard.gameBoardArr [8] && !checkForEmptyDiagonal1(0)){
        gameOver.setText(gameBoard.gameBoardArr[0]);
        checkForWinner.gameOverSwitch = true;
    }
    else if (gameBoard.gameBoardArr[2] === gameBoard.gameBoardArr[4] && gameBoard.gameBoardArr [2] === gameBoard.gameBoardArr [6] && !checkForEmptyDiagonal2(2)){
        gameOver.setText(gameBoard.gameBoardArr[2]);
        checkForWinner.gameOverSwitch = true;
    }

    else if (!gameBoard.gameBoardArr.includes('')){
        gameOver.setText('Noone');
        checkForWinner.gameOverSwitch = true;
    }
   

    return {gameOverSwitch};
    
};

const getRandomNumber1to9 = () => {
    const randomNumber1to9 = Math.floor(Math.random()* (10-1) + 1)
    return {randomNumber1to9};
}

const computerLogic = (() => {
    const random1to9 = 0;
    const bool = false;
    const checkForEmptyCells = () => {   
         if (outer.counter < 5){   
            do {
            
                if (gameBoard.gameBoardArr[computerLogic.random1to9] === ''){
                
                computerLogic.bool = true;
                
            } 
            else {
                
                computerLogic.bool = false;
                
                computerLogic.random1to9 = getRandomNumber1to9().randomNumber1to9;
            }  
            } while (computerLogic.bool === false);   
         }
    }
    return {checkForEmptyCells, random1to9};
})();




const outer = (() => {
   
    const currentPlayer = Number(getStartPlayer());
    const counter = 0;
    
    const handleEventTwoPlayer = (event) => {
        
        
        
        
        
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
        event.currentTarget.removeEventListener('click', handleEventTwoPlayer);
        
        checkForWinner();  
        
    };
    
    const handleEventVsComputer = (event) => {
        outer.counter++;
       
        
        
        
        const clickedField = event.currentTarget.getAttribute('data');
        
        if (outer.currentPlayer === 1){
            gameBoard.gameBoardArr[clickedField-1] = getInput().symbol1;
            
            
            renderToPage(gameBoard.gameBoardArr, getBoxes);
            outer.currentPlayer = 2;
            
            
        }
        checkForWinner();
        
        if (!checkForWinner.gameOverSwitch){
        computerLogic.random1to9 = getRandomNumber1to9().randomNumber1to9;
        computerLogic.checkForEmptyCells();
        gameBoard.gameBoardArr[computerLogic.random1to9] = getInput().symbol1 === 'x' ? 'o' : 'x';
        renderToPage(gameBoard.gameBoardArr, getBoxes);
        
        outer.currentPlayer = 1;
        
        checkForWinner();
        
        
         

        }
        
        event.currentTarget.removeEventListener('click', handleEventVsComputer);
    };

      
    
        return {handleEventTwoPlayer, handleEventVsComputer, currentPlayer, counter};
})();

const switchButtons = (event) => {
    if (document.querySelector('input[name="chooseMode"]:checked').value === "twoPlayer")  {
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
    }
};

const switchMode = (event) => {
    if (event.target.value === "vsComputer"){
        const nodes = document.getElementById("player2Input").getElementsByTagName('*');
        for(let i = 0; i < nodes.length; i++){
            nodes[i].disabled = true;
        }
    }
    else if(event.target.value === "twoPlayer"){
        const nodes = document.getElementById("player2Input").getElementsByTagName('*');
        for(let i = 0; i < nodes.length; i++){
            nodes[i].disabled = false;
        }
    }

};


getRadioButtons1.radioButtons.forEach((button) => {
button.addEventListener('change', switchButtons);
});

getRadioButtons2.radioButtons.forEach((button) => {
    button.addEventListener('change', switchMode);
    });

const displayText = (() => {
    const createPara = () => {    
        const text = document.createElement('p');
        
        text.setAttribute('class', 'text');
        text.setAttribute('id', 'turn');
        const divToInsertBefore= document.getElementById('gameboard');
        divToInsertBefore.parentNode.insertBefore(text, divToInsertBefore);
        
    }
    const setText = (currentPlayer) => {
        console.log('alert');
        if(document.getElementById('turn') !== null){
            document.getElementById('turn').innerHTML = `${currentPlayer}, it's your turn.`;
        }
    }
    return {createPara, setText};
})();





const playButton = document.getElementById('play');
playButton.addEventListener('click', (event) => {
    
    event.preventDefault();
    displayText.createPara();
    
    
    if(document.querySelector('input[name="chooseMode"]:checked').value === 'twoPlayer'){
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
            field.addEventListener('click', outer.handleEventTwoPlayer);
            
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
    
    }
    else if (document.querySelector('input[name="chooseMode"]:checked').value === 'vsComputer'){
        const player1 = player(getInput().name1, getInput().symbol1);
        const player2 = player('Computer', getInput().symbol1 === 'x' ? 'o' : 'x');
        
        if (outer.counter < 1 && outer.currentPlayer === 2){
            gameBoard.gameBoardArr[computerLogic.random1to9] = player2.sign;
            
            renderToPage(gameBoard.gameBoardArr, getBoxes);
            outer.currentPlayer = 1;
        };

        
        
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
            field.addEventListener('click', outer.handleEventVsComputer);
            
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
    }
    playButton.setAttribute('disabled', '');
});







