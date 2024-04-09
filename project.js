// user will Deposit some money
// determine number of lines to bet on
// collect a bet amount from user
// spin the slot machine
// check if the user won
// give the user winning amt
//  play again

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOL_COUNT = {
    A : 2,
    B : 4,
    C : 6,
    D : 8,
}

const SYMBOL_VALUES = {
    A : 5,
    B : 4,
    C : 3,
    D : 2,
}


const deposit = () => {
    while(true){
    const depositamount = prompt("Enter amount : ");
    const amountnumber = parseFloat(depositamount);

    if(isNaN(amountnumber) || amountnumber<=0){
        console.log("invalid deposit amount");
    }else{
        return amountnumber;
    }
}
}

const getnumberoflines = () => {
    while(true){
        const lines = prompt("Enter the number of lines to bet on : ");
        const numberoflines = parseFloat(lines);
        
        if(isNaN(numberoflines) || numberoflines<=0 || numberoflines>3){
            console.log("invalid line number");
        }else{
            return numberoflines;
        }
    }
}


const getbet = (balance,lines) => {
    while(true){
        const bet = prompt("Enter the bet amount per line : ");
        const betamount = parseFloat(bet);
        
        if(isNaN(betamount) || betamount<=0 || betamount>balance/lines){
            console.log("invalid bet amount");
        }else{
            return betamount;
        }
    }
}

const spin = () => {
    const symbols = [];
    for(const[symbol, count] of Object.entries(SYMBOL_COUNT)){
      for(let i=0;i<count;i++){
        symbols.push(symbol);
      }
    }
    const reels = [];
    for (let i = 0; i < COLS; i++) {
      reels.push([]);
      const reelSymbols = [...symbols];
      for (let j = 0; j < ROWS; j++) {
        const randomIndex = Math.floor(Math.random() * reelSymbols.length);
        const selectedSymbol = reelSymbols[randomIndex];
        reels[i].push(selectedSymbol);
        reelSymbols.splice(randomIndex, 1);
      }
    }
return reels;
}

const transpose =(reels)=>{
    const rows =[];
    for(let i=0;i<ROWS;i++){
        rows.push([]);
        for(let j=0;j<COLS;j++){
            rows[i].push(reels[j][i])
        }
    }
    return rows;
}

const printRows = (rows) => {
    for (const row of rows) {
      let rowString = "";
      for (const [i, symbol] of row.entries()) {
        rowString += symbol;
        if (i != row.length - 1) {
          rowString += " | ";
        }
      }
      console.log(rowString);
    }
  };

  const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
  
    for (let row = 0; row < lines; row++) {
      const symbols = rows[row];
      let allSame = true;
  
      for (const symbol of symbols) {
        if (symbol != symbols[0]) {
          allSame = false;
          break;
        }
      }
  
      if (allSame) {
        winnings += bet * SYMBOL_VALUES[symbols[0]];
      }
    }
  
    return winnings;
  };

  const game = () => {
    let balance = deposit();
  
    while (true) {
      console.log("You have a balance of $" + balance);
      const numberOfLines = getnumberoflines();
      const bet = getbet(balance, numberOfLines);
      balance -= bet * numberOfLines;
      const reels = spin();
      const rows = transpose(reels);
      printRows(rows);
      const winnings = getWinnings(rows, bet, numberOfLines);
      balance += winnings;
      console.log("You won, $" + winnings.toString());
  
      if (balance <= 0) {
        console.log("You ran out of money!");
        break;
      }
  
      const playAgain = prompt("Do you want to play again (y/n)? ");
  
      if (playAgain != "y") break;
    }
  };


  game();


