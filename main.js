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
        const playAgainButon = document.createElement('button');
        playAgainButon.setAttribute('id', 'playAgainButton');
        playAgainButon.innerHTML = 'replay';
        const divToInsertAfter = document.getElementById('gameOverMessage');
        divToInsertAfter.parentNode.insertBefore(playAgainButon, divToInsertAfter.nextSibling);
        playAgainButon.addEventListener('click', reset);
    }
    return {
        preparePlayAgainButton
    }
})();


const gameOver = (() => {
    
        
        const removeEventListeners = () => {   
            for (let i = 0; i < 9; i++){
               
                if (gameBoard.gameBoardArr[i] === ''){
                    
                    document.querySelector(`div[data="${i+1}"]`).removeEventListener('click', outer.handleEventTwoPlayer);
                }
            }
        }

        const removeEventListeners2 = () => {   
            for (let i = 0; i < 9; i++){
               
                if (gameBoard.gameBoardArr[i] === ''){
                    
                    document.querySelector(`div[data="${i+1}"]`).removeEventListener('click', outer.handleEventVsComputer);
                }
            }
        }


        
    
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

        
    return {setText, removeEventListeners, removeEventListeners2};
   
    
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


const computerLogic = (() => {
    
   
    const twoDimensionArray = [['u', 'u', 'u'],
                               ['u', 'u', 'u'],
                               ['u', 'u', 'u']];

    const transform = () => {
        if (document.querySelector('input[name="player1symb"]:checked').value === 'x'){
        twoDimensionArray[0][0] = gameBoard.gameBoardArr[0] === 'x' ? 2 : gameBoard.gameBoardArr[0] === 'o' ? 0 : 'u';
        twoDimensionArray[0][1] = gameBoard.gameBoardArr[1] === 'x' ? 2 : gameBoard.gameBoardArr[1] === 'o' ? 0 : 'u';
        twoDimensionArray[0][2] = gameBoard.gameBoardArr[2] === 'x' ? 2 : gameBoard.gameBoardArr[2] === 'o' ? 0 : 'u';
        twoDimensionArray[1][0] = gameBoard.gameBoardArr[3] === 'x' ? 2 : gameBoard.gameBoardArr[3] === 'o' ? 0 : 'u';
        twoDimensionArray[1][1] = gameBoard.gameBoardArr[4] === 'x' ? 2 : gameBoard.gameBoardArr[4] === 'o' ? 0 : 'u';
        twoDimensionArray[1][2] = gameBoard.gameBoardArr[5] === 'x' ? 2 : gameBoard.gameBoardArr[5] === 'o' ? 0 : 'u';
        twoDimensionArray[2][0] = gameBoard.gameBoardArr[6] === 'x' ? 2 : gameBoard.gameBoardArr[6] === 'o' ? 0 : 'u';
        twoDimensionArray[2][1] = gameBoard.gameBoardArr[7] === 'x' ? 2 : gameBoard.gameBoardArr[7] === 'o' ? 0 : 'u';
        twoDimensionArray[2][2] = gameBoard.gameBoardArr[8] === 'x' ? 2 : gameBoard.gameBoardArr[8] === 'o' ? 0 : 'u';
        }
        else if (document.querySelector('input[name="player1symb"]:checked').value === 'o'){
            twoDimensionArray[0][0] = gameBoard.gameBoardArr[0] === 'o' ? 2 : gameBoard.gameBoardArr[0] === 'x' ? 0 : 'u';
            twoDimensionArray[0][1] = gameBoard.gameBoardArr[1] === 'o' ? 2 : gameBoard.gameBoardArr[1] === 'x' ? 0 : 'u';
            twoDimensionArray[0][2] = gameBoard.gameBoardArr[2] === 'o' ? 2 : gameBoard.gameBoardArr[2] === 'x' ? 0 : 'u';
            twoDimensionArray[1][0] = gameBoard.gameBoardArr[3] === 'o' ? 2 : gameBoard.gameBoardArr[3] === 'x' ? 0 : 'u';
            twoDimensionArray[1][1] = gameBoard.gameBoardArr[4] === 'o' ? 2 : gameBoard.gameBoardArr[4] === 'x' ? 0 : 'u';
            twoDimensionArray[1][2] = gameBoard.gameBoardArr[5] === 'o' ? 2 : gameBoard.gameBoardArr[5] === 'x' ? 0 : 'u';
            twoDimensionArray[2][0] = gameBoard.gameBoardArr[6] === 'o' ? 2 : gameBoard.gameBoardArr[6] === 'x' ? 0 : 'u';
            twoDimensionArray[2][1] = gameBoard.gameBoardArr[7] === 'o' ? 2 : gameBoard.gameBoardArr[7] === 'x' ? 0 : 'u';
            twoDimensionArray[2][2] = gameBoard.gameBoardArr[8] === 'o' ? 2 : gameBoard.gameBoardArr[8] === 'x' ? 0 : 'u';
            }
    
    }
    
    let minX = 0;
    let minY = 0;
    let maxX = 0;
    let maxY = 0;
    const obj = {a: 2, b: 0};
    
    const evaluation = () => {
        for (const property in obj){
            for (let i = 0; i < 3; i++){
                
                if (twoDimensionArray[i][0] === obj[property] && twoDimensionArray[i][1] === obj[property] && twoDimensionArray[i][2] === obj[property]){
                    return obj[property];
                }
            }
            for (let i = 0; i < 3; i++){
                
                if (twoDimensionArray[0][i] === obj[property] && twoDimensionArray[1][i] === obj[property] && twoDimensionArray[2][i] === obj[property]){
                    return obj[property];
                }
            }

            if (twoDimensionArray[0][0] === obj[property] && twoDimensionArray[1][1] === obj[property] && twoDimensionArray[2][2] === obj[property]){
                return obj[property];
            }


            if (twoDimensionArray[0][2] === obj[property] && twoDimensionArray[1][1] === obj[property] && twoDimensionArray[2][0] === obj[property]){
                return obj[property];
            }
        }
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                if (twoDimensionArray[i][j] === 'u'){
                    return -1;
                }        
            }
        }
        return 1;
    }

    const max = () => {
        if (computerLogic.evaluation() !== -1){
            return computerLogic.evaluation();
        }
        let maxvalue = -999;
        let wert = 0;
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                if (twoDimensionArray[i][j] === 'u'){
                    twoDimensionArray[i][j] = 2;
                    wert = computerLogic.min();
                    if (wert > maxvalue){
                        maxvalue = wert;
                    }
                    twoDimensionArray[i][j] = 'u';
                }
            }
        }
        return maxvalue;
    }

    const min = () => {
        if (computerLogic.evaluation() !== -1){
            return computerLogic.evaluation();
        }
        let minvalue = 999;
        let wert = 0;
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                if (twoDimensionArray[i][j] === 'u'){
                    twoDimensionArray[i][j] = 0;
                    wert = computerLogic.max();
                    if (wert < minvalue){
                        minvalue = wert;
                    }
                    twoDimensionArray[i][j] = 'u';
                }
            }
        }
        return minvalue;
    }

    const maxWo = () => { 
        if (computerLogic.evaluation() !== -1){
            return computerLogic.evaluation();
        }
        let maxvalue = -999;
        let wert = 0;
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                if (twoDimensionArray[i][j] === 'u'){
                    twoDimensionArray[i][j] = 2;
                    wert = computerLogic.minWo();
                    if (wert > maxvalue){
                        maxvalue = wert;
                        computerLogic.maxX = i;
                        computerLogic.maxY = j;
                    }
                    twoDimensionArray[i][j] = 'u';

                }
            }
        }
        return maxvalue;
    }

    const minWo = () => { 
        if (computerLogic.evaluation() !== -1){
            return computerLogic.evaluation();
        }
        let minvalue = 999;
        let wert = 0;
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                if (twoDimensionArray[i][j] === 'u'){
                    twoDimensionArray[i][j] = 0;
                    wert = computerLogic.max();
                    if (wert < minvalue){
                        minvalue = wert;
                        computerLogic.minX = i;
                        computerLogic.minY = j;
                    }
                    twoDimensionArray[i][j] = 'u';

                }
            }
        }
        return minvalue;
    }
    
    return {transform, evaluation, max, min, minWo, maxWo, minX, minY, maxX, maxY, twoDimensionArray};

    
}
    
)();




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
        
        if (checkForWinner.gameOverSwitch){
            
            gameOver.removeEventListeners();   
        }
        
    };
    
    const handleEventVsComputer = (event) => {
        outer.counter++;
        let moveBackTransform = 0;
        computerLogic.transform();
        
       
        
        const clickedField = event.currentTarget.getAttribute('data');
        
        if (outer.currentPlayer === 1 && computerLogic.evaluation() === -1){
            gameBoard.gameBoardArr[clickedField-1] = getInput().symbol1;
           
            
            renderToPage(gameBoard.gameBoardArr, getBoxes);
            outer.currentPlayer = 2;
            
            event.currentTarget.removeEventListener('click', outer.handleEventVsComputer);
            
        }
        checkForWinner();

        computerLogic.transform();
        
        if (outer.currentPlayer === 2 && computerLogic.evaluation() === -1){
       
        computerLogic.minWo();
        
       
        
        
        if (computerLogic.minX === 0 && computerLogic.minY === 0){
            gameBoard.gameBoardArr[0] = getInput().symbol1 === 'x' ? 'o' : 'x';
            handleEventVsComputer.moveBackTransform = 0;
            
        }
        if (computerLogic.minX === 0 && computerLogic.minY === 1){
            gameBoard.gameBoardArr[1] = getInput().symbol1 === 'x' ? 'o' : 'x';
            handleEventVsComputer.moveBackTransform = 1;
        }
        if (computerLogic.minX === 0 && computerLogic.minY === 2){
            gameBoard.gameBoardArr[2] = getInput().symbol1 === 'x' ? 'o' : 'x';
            handleEventVsComputer.moveBackTransform = 2;
        }
        if (computerLogic.minX === 1 && computerLogic.minY === 0){
            gameBoard.gameBoardArr[3] = getInput().symbol1 === 'x' ? 'o' : 'x';
            handleEventVsComputer.moveBackTransform = 3;
        }
        if (computerLogic.minX === 1 && computerLogic.minY === 1){
            gameBoard.gameBoardArr[4] = getInput().symbol1 === 'x' ? 'o' : 'x';
            handleEventVsComputer.moveBackTransform = 4;
        }
        if (computerLogic.minX === 1 && computerLogic.minY === 2){
            gameBoard.gameBoardArr[5] = getInput().symbol1 === 'x' ? 'o' : 'x';
            handleEventVsComputer.moveBackTransform = 5;
        }
        if (computerLogic.minX === 2 && computerLogic.minY === 0){
            gameBoard.gameBoardArr[6] = getInput().symbol1 === 'x' ? 'o' : 'x';
            handleEventVsComputer.moveBackTransform = 6;
        }
        if (computerLogic.minX === 2 && computerLogic.minY === 1){
            gameBoard.gameBoardArr[7] = getInput().symbol1 === 'x' ? 'o' : 'x';
            handleEventVsComputer.moveBackTransform = 7;
        }
        if (computerLogic.minX === 2 && computerLogic.minY === 2){
            gameBoard.gameBoardArr[8] = getInput().symbol1 === 'x' ? 'o' : 'x';
            handleEventVsComputer.moveBackTransform = 8;
        }
        

        renderToPage(gameBoard.gameBoardArr, getBoxes);
        
        outer.currentPlayer = 1;
        
        checkForWinner();

        
        
        document.querySelector(`div[data="${handleEventVsComputer.moveBackTransform + 1}"]`).removeEventListener('click', outer.handleEventVsComputer);
         
        if (checkForWinner.gameOverSwitch){
            
            gameOver.removeEventListeners2();   
        }
        
        }

        computerLogic.transform();
        
        
        
        
        if (checkForWinner.gameOverSwitch){
            
            gameOver.removeEventListeners();   
        }
        
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
    
    
    computerLogic.transform();
    
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
        
        getClickFields.fields.forEach((field) => {
            field.addEventListener('click', outer.handleEventVsComputer);
            
        });
        
        
    
        

        if (outer.counter < 1 && outer.currentPlayer === 2){
            computerLogic.transform();
            computerLogic.minWo();
            
            
            
            if (computerLogic.minX === 0 && computerLogic.minY === 0){
                gameBoard.gameBoardArr[0] = player2.sign;
                outer.handleEventVsComputer.moveBackTransform = 0;
                
            }
            if (computerLogic.minX === 0 && computerLogic.minY === 1){
                gameBoard.gameBoardArr[1] = player2.sign;
                outer.handleEventVsComputer.moveBackTransform = 1;
            }
            if (computerLogic.minX === 0 && computerLogic.minY === 2){
                gameBoard.gameBoardArr[2] = player2.sign;
                outer.handleEventVsComputer.moveBackTransform = 2;
            }
            if (computerLogic.minX === 1 && computerLogic.minY === 0){
                gameBoard.gameBoardArr[3] = player2.sign;
                outer.handleEventVsComputer.moveBackTransform = 3;
            }
            if (computerLogic.minX === 1 && computerLogic.minY === 1){
                gameBoard.gameBoardArr[4] = player2.sign;
                outer.handleEventVsComputer.moveBackTransform = 4;
            }
            if (computerLogic.minX === 1 && computerLogic.minY === 2){
                gameBoard.gameBoardArr[5] = player2.sign;
                outer.handleEventVsComputer.moveBackTransform = 5;
            }
            if (computerLogic.minX === 2 && computerLogic.minY === 0){
                gameBoard.gameBoardArr[6] = player2.sign;
                outer.handleEventVsComputer.moveBackTransform = 6;
            }
            if (computerLogic.minX === 2 && computerLogic.minY === 1){
                gameBoard.gameBoardArr[7] = player2.sign;
                outer.handleEventVsComputer.moveBackTransform = 7;
            }
            if (computerLogic.minX === 2 && computerLogic.minY === 2){
                gameBoard.gameBoardArr[8] = player2.sign;
                outer.handleEventVsComputer.moveBackTransform = 8;
            }
            
            computerLogic.transform();
            
            renderToPage(gameBoard.gameBoardArr, getBoxes);
            outer.currentPlayer = 1;
            
            document.querySelector(`div[data="${outer.handleEventVsComputer.moveBackTransform + 1}"]`).removeEventListener('click', outer.handleEventVsComputer);
            
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







