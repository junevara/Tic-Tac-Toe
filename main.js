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

}

const play = () => {
    const player1 = player(name1, symbol1);
    const player2 = player(name2, symbol2);
    
}

const outer = (() => {
    let turn = 0;
    let currentPlayer;
    const handleEvent = (event) => {
        
        if (turn === 0){
            currentPlayer = getStartPlayer();
        }

        
        
        const clickedField = event.currentTarget.getAttribute('data');
        
        if (currentPlayer === 1){
            gameBoard.gameBoardArr[clickedField-1] = getInput().symbol1;
            
            
            renderToPage(gameBoard.gameBoardArr, getBoxes);
            currentPlayer = 2;
            turn++;
        }
        else if (currentPlayer === 2){
            gameBoard.gameBoardArr[clickedField-1] = getInput().symbol2;
            
            
            renderToPage(gameBoard.gameBoardArr, getBoxes);
            currentPlayer = 1;
            turn++;
        }
        event.currentTarget.removeEventListener('click', handleEvent);
    
    }
    
    return {handleEvent};
})();



// const startPlayer = getStartPlayer();
// console.log(startPlayer);   
// let currentPlayer = startPlayer;
getClickFields.fields.forEach((field) => {
    field.addEventListener('click', outer.handleEvent);
    
    })







