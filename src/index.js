const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const route = process.cwd();
const { pathAbsolute, getFilesMd} = require("./getFiles");

//console.log(chalk.blue(path));

// function existsFile(route) {
//   return fs.existsSync(route);
// }
// console.log(existsFile(route))

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    const absolutePath = pathAbsolute(path);
    const files = getFilesMd(path);
    // if (fs.existsSync(path) === true) {
    //   resolve(console.log(chalk.magenta(path)));
    // } else {
    //   reject(new Error("the path doesn't exists"));
    // }
  })
}
mdLinks(route);



module.exports = () => {
  // ...
};
