const fs = require("fs");

const HelpCommand = require("./commands/help.js");
const organizeCommand = require("./commands/organize.js");
const treeCommand = require("./commands/tree.js");

let inputArr = process.argv.slice(2);

let command = inputArr[0];

switch (command) {
  case "tree":
    treeCommand.treeHelper(inputArr[1]);
    break;
  case "organize":
    organizeCommand.organizer(inputArr[1]);
    break;
  case "help":
    HelpCommand.Helper();
    break;
  default:
    console.log("Please Enter Right command");
}
