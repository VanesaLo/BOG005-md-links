const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const route = process.cwd();
const { pathAbsolute, getFilesMd, infoLinks} = require("./functions.js");

//console.log(chalk.blue(path));



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
  // ...
};
