const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const marked = require("marked");
const route = "proof-docs";

function pathAbsolute(newPath) {
  let pathChange = "";
  if (!path.isAbsolute(newPath)) {
    pathChange = path.resolve(newPath);
  } else {
    pathChange = newPath;
  }
  return pathChange;
}
console.log(chalk.magenta(pathAbsolute(route)));

function getFilesMD(filesMd) {
  const file = fs.statSync(filesMd).isFile();
  const directory = fs.statSync(filesMd).isDirectory();
  const extension = path.extname(filesMd);
  let obtainPath = pathAbsolute(filesMd);
  let arrayFiles = [];

  if (file && extension === ".md") {
    arrayFiles.push(obtainPath);
  } else if (file && extension !== ".md") {
    console.log(chalk.red("The " + obtainPath + " extension is: " + extension));
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
console.log(getFilesMD(route));

// Leer un archivo .md y extraer los links
function getLinks(data = []) {
  let currentResult = [];
  data.forEach((item) => {
    if (item.type === "link" && item.href.startsWith("http")) {
      currentResult.push({ "href": item.href, "text": item.text });
    } else if (Array.isArray(item.tokens) || Array.isArray(item.items)) {
      const items = item.tokens || item.items;
      const childrenResults = getLinks(items);
      currentResult = currentResult.concat(childrenResults);
    }
  });
  return currentResult;
}

function obtainInfoLink(filePathMD) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePathMD, "utf-8", (err, data) => {
      if (err) reject(err);

      const result = marked.lexer(data);
      const resultDos = getLinks(result);
      resolve(resultDos);
    });
  });
}

function getLinks2(routes) {
  return new Promise((resolve, reject) => {
    const promises = [];
    routes.forEach((route) => {
      promises.push(obtainInfoLink(route));
    });

    Promise.all(promises).then((results) => {
      let allLinks = [];
      results.forEach((links, index) => {
        let item = { path: routes[index], links: links };
        allLinks.push(item);
      });

      resolve(allLinks);
    });
  });
}

getLinks2(routes).then((allLinks) => {
  // console.log(allLinks);

  console.log(
    util.inspect(allLinks, { showHidden: false, depth: null, colors: true })
  );
});

module.exports = {
  pathAbsolute,
  getFilesMD,
  // infoLinks
};
