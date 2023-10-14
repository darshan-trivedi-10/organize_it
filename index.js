const fs = require("fs");
const HelpCommand = require("./commands/help.js");
const {organizer} = require("./commands/organize.js");

let inputArr = process.argv.slice(2);

let command = inputArr[0];

switch (command) {
  case "tree":
    break;
  case "organize":
    organizer.organizeFn(inputArr[1]);
    break;
  case "help":
    HelpCommand.Helper();
    break;
  default:
    console.log("Please Enter Right command");
}
