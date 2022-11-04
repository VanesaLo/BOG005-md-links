const fs = require("fs");
const path = require("path");
const marked = require("marked");
const fetch = require("node-fetch");

function pathAbsolute(newPath) {
  let pathChange = "";
  if (!path.isAbsolute(newPath)) {
    pathChange = path.resolve(newPath);
  } else {
    pathChange = newPath;
  }
  return pathChange;
}

function getFiles(filesMd) {
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
      arrayFiles = arrayFiles.concat(getFiles(pathDirectory));
    });
  }
  return arrayFiles;
}

function infoLink(pathFile) {
  return new Promise((resolve, reject) => {
    fs.readFile(pathFile, "utf-8", (err, data) => {
      if (err) reject(err);

      const markedLexer = marked.lexer(data);
      const result = getLinks(markedLexer);

      result.forEach((item) => (item.file = pathFile));

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
      });
      resolve(allLinks);
    });
  });
}

function validateHTTP(filePath) {
  const requestHTTP = filePath.map((item) => {
    return fetch(item.href)
      .then((answer) => {
        item.status = answer.status;
        item.txt = answer.status <= 399 ? "Ok" : "Fail";
        return item;
      })
      .catch(() => {
        item.status = "the server not response";
        item.txt = "Fail";
        return item;
      });
  });
  return Promise.all(requestHTTP);
}

const statsFiles = (filePath) => {
  return {
    Total: filePath.length,
    Unique: new Set(filePath.map((linkObj) => linkObj.href)).size,
  };
};

const statsAndValidateFiles = (filePath) => {
  const broken = filePath.filter((item) => item.txt === "Fail").length;
  return {
    Total: filePath.length,
    Unique: new Set(filePath.map((linkObj) => linkObj.href)).size,
    Broken: broken,
  };
};

module.exports = {
  pathAbsolute,
  getFiles,
  getLinks2,
  validateHTTP,
  statsFiles,
  statsAndValidateFiles,
};
