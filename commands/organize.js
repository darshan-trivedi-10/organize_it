const fs = require('fs');
const path = require('path');

const types = {
    media: ["mp4", "mkv", "avi", "wmv", "mov", "flv", "mp3", "wav", "flac"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz", "cab", "bz2"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex', "rtf", "ppt", "pptx"],
    app: ['exe', 'dmg', 'pkg', "deb", "msi", "apk", "appimage", "bat", "sh"],
    images: ["jpg", "jpeg", "png", "gif", "bmp", "tiff", "webp"],
    spreadsheets: ["csv", "tsv"],
    code: ["html", "css", "js", "java", "cpp", "py", "rb", "php"],
    compressed: ["gz", "z", "bz", "lz", "tar.gz", "tgz"],
    ebooks: ["epub", "mobi", "azw", "pdf"],
    fonts: ["ttf", "otf", "woff", "woff2"],
    presentations: ["ppt", "pptx", "key", "odp"],
    databases: ["sql", "sqlite", "db"],
    executables: ["jar", "bin", "cmd", "com"],
    vectors: ["svg", "ai", "eps"],
}

function createDirectory(newPath){
    try {
        if(fs.existsSync(newPath)){
            return;
        }else{
            fs.mkdirSync(newPath);
        }
    } catch (error) {
        console.log("Something went wrong, but don't worry, we are still trying.")
    }
}

function getFileCategory(fileName){
    let ext = path.extname(fileName);
    ext = ext.slice(1);
    for(let type in types){
        let currType = types[type];
        for(let i = 0; i <currType.length; i++){
            if(ext == currType[i]){
                return type;
            }
        }
    }

    return "other";
}

function sendFile(srcFilePath, destPath, category){
    try {
        let categoryPath = path.join(destPath, category);
        createDirectory(categoryPath);
        
        let fileName = path.basename(srcFilePath);
        let destFilePath = path.join(categoryPath, fileName);
    
        fs.copyFileSync(srcFilePath, destFilePath);
        console.log(fileName, "Copied to ", category);
    
        fs.unlinkSync(srcFilePath);  
    } catch (error) {
        console.log("Something went wrong, but don't worry, we are still trying.")
    }  
}

function organizeFiles(srcPath, destPath){
    try {
        let childrenName = fs.readdirSync(srcPath);
        for(let i = 0; i < childrenName.length; i++){
            let childAddress = path.join(srcPath, childrenName[i]);
            let isFile = fs.lstatSync(childAddress).isFile();
            if(isFile){
                let category = getFileCategory(childrenName[i]);
                sendFile(childAddress, destPath, category);
            }
        }
    } catch (error) {
        console.log("Something went wrong, but don't worry, we are still trying.")
    }
}

function organizeFn(srcPath){
    try {
        let destPath;
        if(destPath == undefined){
            destPath = process.cwd();
        }
    
        let isDirExists = fs.existsSync(srcPath);
        if(isDirExists){
            destPath = path.join(srcPath, "organized_files");
            createDirectory(destPath);
            organizeFiles(srcPath, destPath);
        }else{
            console.log("Path is not Exist");
        }
    } catch (error) {
        console.log("Something went wrong, but don't worry, we are still trying.")
    }
}

module.exports = {
    organizer : organizeFn
}