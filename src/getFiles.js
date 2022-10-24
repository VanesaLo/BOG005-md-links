const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const route = "proof-docs";




function pathAbsolute (newPath) {
    let pathChange = "";
    if (!path.isAbsolute(newPath)) {
        pathChange = path.resolve(newPath);
    } else {
        pathChange = newPath;
    }
    return pathChange;
}

console.log(chalk.blue(pathAbsolute(route)));

function getFilesMD(filesMd) {
    const file = fs.statSync(filesMd).isFile();
    const directory = fs.statSync(filesMd).isDirectory();
    const extension = path.extname(filesMd);
    let obtainPath = pathAbsolute(filesMd);
    let arrayFiles = [];

    if (file && extension === ".md") {
        arrayFiles.push(obtainPath);
    } else if (file && extension !== ".md") {
        console.log(chalk.red("The file's extension is: " + extension));
    } else{
    fs.readdirSync(filesMd).forEach(file => {
        let pathDirectory = path.join(filesMd, file);
        if(directory) {
            arrayFiles = arrayFiles.concat(getFilesMD(pathDirectory));
        } else {
            if(path.extname(pathDirectory) === ".md") {
                arrayFiles.push(pathDirectory);
            }
        }
           
    })};
    return arrayFiles;
};

console.log(getFilesMD(route));


module.exports = {
    pathAbsolute, 
    getFilesMD
};

// Paso siguiente : leer el archivo md y extraer los links