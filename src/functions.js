const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const marked = require("marked");
const fetch = require("node-fetch");
const util = require("util");
const route = "proof-docs";
const routeFile = "proof-docs\PRUEBA2.md";

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
  const file = fs.statSync(filesMd).isFile();
  const directory = fs.statSync(filesMd).isDirectory();
  const extension = path.extname(filesMd);
  let obtainPath = pathAbsolute(filesMd);
  let arrayFiles = [];

  if (file && extension === ".md") {
    arrayFiles.push(obtainPath);
  } else if (file && extension !== ".md") {
    // console.log(chalk.red("The " + obtainPath + " extension is: " + extension));
  } else {
    fs.readdirSync(filesMd).forEach((file) => {
      let pathDirectory = path.join(filesMd, file);
      if (directory) {
        arrayFiles = arrayFiles.concat(getFilesMD(pathDirectory));
      } else {
        if (path.extname(pathDirectory) === ".md") {
          arrayFiles.push(pathDirectory);
        }
      }
    });
  }
  return arrayFiles;
}
// console.log(getFilesMD(route));

// Leer un archivo .md y extraer los links

function infoLink(files) {
  return new Promise((resolve, reject) => {
    fs.readFile(files, "utf-8", (err, data) => {
      if (err) reject(err);

      const result = marked.marked(data);
      const resultDos = getLinks(result);
      resolve(resultDos);
    });
  });
}


 function getLinks(files) {
  let currentResult = [];
  files.forEach((item) => {
    if (item.type === "link" && item.href.startsWith("http")) {
      currentResult.push({
        href: item.href,
        text: item.text,
        file: route,
      });
    } else if (Array.isArray(item.tokens) || Array.isArray(item.items)) {
      const items = item.tokens || item.items;
      const childrenResults = getLinks(items);
      currentResult = currentResult.concat(childrenResults);
    }
  });
  return currentResult.flat();
}
 


function getLinks2(getFilesMD) {
  return new Promise((resolve) => {
    const promises = [];

    getFilesMD(route).forEach((pat) => {
      promises.push(infoLink(pat));
    });

    Promise.all(promises).then((results) => {
      resolve(results);
    });
  });
}

getLinks2(getFilesMD).then((results) => {
  console.log(
    util.inspect(results, { showHidden: false, depth: null, colors: true })
  );
});

function validateHTTP(filePathMD) {
  // console.log(filePathMD + "estoy en validate" );
  const requestHTTP = filePathMD.map((item) => {
     return fetch(item.href).then((answer) => {
          item.status = answer.status;
          item.txt = answer.status <= 399 ? 'Ok' : 'Fail';
          //console.log('soy link', link)
          return (item);

      })
  })
  return Promise.all(requestHTTP)
}



module.exports = {
  pathAbsolute,
  getFilesMD,
  //getLinks,
  validateHTTP
};
