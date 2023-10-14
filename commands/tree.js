const fs = require("fs");
const path = require("path");

function treeHelper(dirPath, indent){
    try {
        let isFile = fs.lstatSync(dirPath).isFile();
        if(isFile == true){
            let dirName = path.basename(dirPath);
            console.log(indent + "├──" + dirName);
        }else{
            let dirName = path.basename(dirPath);
            console.log(indent + "├──" + dirName);
            let children = fs.readdirSync(dirPath);
            for(let i = 0; i < children.length; i++){
                let childrenPath = path.join(dirPath, children[i]);
                treeHelper(childrenPath, indent + "\t");
            }
        }
    } catch (error) {
        console.log("Something went wrong, but don't worry, we are still trying.")
    }
}

function treeFn(dirPath){
    try {
        if(dirPath == undefined){
            treeHelper(process.cwd(), "");
        }
    
        let isDirExists = fs.existsSync(dirPath);
        if(isDirExists){
            treeHelper(dirPath, "");
        }else{
            console.log("Path is not Exist");
        }
    } catch (error) {
        console.log("Something went wrong, but don't worry, we are still trying.")
    }
}

module.exports = {
    treeHelper : treeFn
}