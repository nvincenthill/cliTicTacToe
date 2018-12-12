const program = require("commander");
const Game = require("./components/Game");

program.version("1.0.0").parse(process.argv);

console.log("CLI Tic-Tac-Toe by Nicholas Vincent-Hill - www.nickvh.tech");

let newGame = new Game();
newGame.startGame();
