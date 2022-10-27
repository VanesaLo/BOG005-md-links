const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const route = process.cwd();
const { pathAbsolute, getFilesMd, infoLinks} = require("./functions.js");

//console.log(chalk.blue(path));
function existsFile(route) {
  return fs.existsSync(route);
}
console.log(existsFile(route))

if (fs.existsSync(path) === true) {
      (console.log(chalk.magenta(path)));
    } else {
      (new Error("the path doesn't exists"));
    }


const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    const absolutePath = pathAbsolute(path);
    const files = getFilesMd(absolutePath);
    const links = infoLinks(files);
    resolve(links);
  })
}
mdLinks(route).then((data)=>{
  console.log(data);
}),


module.exports = () => {
  existsFile,
  mdLinks
};
