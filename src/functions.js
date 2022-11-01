const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const marked = require("marked");
const fetch = require("node-fetch");
const route = "proof-docs";
const routeFile = "proof-docsPRUEBA2.md";

function pathAbsolute(newPath) {
  let pathChange = "";
  if (!path.isAbsolute(newPath)) {
    pathChange = path.resolve(newPath);
  } else {
    pathChange = newPath;
  }
  return pathChange;
}
// console.log(chalk.magenta(pathAbsolute(route)));

function getFilesMD(filesMd) {
  const isFile = fs.statSync(filesMd).isFile();
  const isDirectory = fs.statSync(filesMd).isDirectory();
  const extension = path.extname(filesMd);
  let obtainPath = pathAbsolute(filesMd);
  let arrayFiles = [];

  if (isFile && extension === ".md") {
    arrayFiles.push(obtainPath);
  } else if (isDirectory) {
    fs.readdirSync(filesMd).forEach((file) => {
      let pathDirectory = path.join(filesMd, file);
      arrayFiles = arrayFiles.concat(getFilesMD(pathDirectory));
    });
  }
  return arrayFiles;
}
 //console.log(getFilesMD(route));

function infoLink(pathFile) {
  return new Promise((resolve, reject) => {
    fs.readFile(pathFile, "utf-8", (err, data) => {
      if (err) reject(err);
     
      const markedLexer = marked.lexer(data);
      const result = getLinks(markedLexer);

      result.forEach((item) => item.file = pathFile)

      resolve(result);
    });
  });
}

function getLinks(data) {
  let currentResult = [];
  data.forEach((item) => {
    if (item.type === "link" && item.href.startsWith("http")) {
      currentResult.push({
        href: item.href,
        text: item.text,
      });
    } else if (Array.isArray(item.tokens) || Array.isArray(item.items)) {
      const items = item.tokens || item.items;
      const childrenResults = getLinks(items);
      currentResult = currentResult.concat(childrenResults);
    }
  });
  return currentResult;
}

function getLinks2(routes) {
  return new Promise((resolve) => {
    const promises = [];

   routes.forEach((route) => {
      promises.push(infoLink(route));
    });

    Promise.all(promises).then((resultsPromises) => {
      let allLinks = [];
      resultsPromises.forEach((resultPromise) => {
        allLinks = allLinks.concat(resultPromise);
      })
      resolve(allLinks);
    });
  });
}



function validateHTTP(filePathMD) {
  const requestHTTP = filePathMD.map((item) => {
    return fetch(item.href).then((answer) => {
      item.status = answer.status;
      item.txt = answer.status <= 399 ? "Ok" : "Fail";
      return item;
    });
  });
  return Promise.all(requestHTTP);
}


module.exports = {
  pathAbsolute,
  getFilesMD,
  getLinks2,
  validateHTTP,
}; 
