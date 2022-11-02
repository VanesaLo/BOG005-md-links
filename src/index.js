const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const route = "proof-docs";
// const routeFile = "proof-docsPRUEBA2.md";

const { pathAbsolute, getFiles, getLinks2, validateHTTP} = require("./functions.js");

// //console.log(chalk.blue(path));
// function existsFile(route) {
//   if (fs.existsSync(path) === true) {
//     (console.log(chalk.magenta(path)));
//   } else {
//     (new Error("the path doesn't exists"));
//   }
//   return fs.existsSync(route);
// }

const mdLinks = (path, options = { validate: true }) => {
  return new Promise((resolve, reject) => {
    const absolutePath = pathAbsolute(path);
    const files = getFiles(absolutePath);

    getLinks2(files).then((links) => {
      if (options.validate === false) {
        resolve(links);
        return;
      }
      validateHTTP(links).then((res) => {
        resolve(res);
      });
    });
  });
};

module.exports = {
  mdLinks
};
