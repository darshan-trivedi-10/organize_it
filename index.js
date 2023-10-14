const fs = require("fs");
const helpCommand = require("./commands/help.js");

let inputArr = process.argv.slice(2);

let command = inputArr[0];
switch (command) {
  case "tree":
    break;
  case "organize":
    break;
  case "help":
    helpCommand.HelpFn(inputArr[1]);
    break;
  default:
    console.log("Please Enter Right command");
}
