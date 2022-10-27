const fs = require("fs");
const marked = require("marked");
const fetch = require("node-fetch");
const util = require("util");
const routes = [
  "proof-docs/file.md",
  "proof-docs/may.md",
  "proof-docs/readme.md",
  "proof-docs/PRUEBA2.md",
];

function getLinks(data) {
  let currentResult = [];
  data.forEach((item, index) => {
    if (item.type === "link" && item.href.startsWith("http")) {
      currentResult.push({
        href: item.href,
        text: item.text,
        file: routes[index],
      });
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
      // let allLinks = [];
      // results.forEach((links, index) => {
      //   // let item = { path: routes[index], links: links };
      //   allLinks.push(links);
      // });

      resolve(results);
    });
  });
}

getLinks2(routes).then((allLinks) => {
  // console.log(allLinks);

  console.log(
    util.inspect(allLinks, { showHidden: false, depth: null, colors: true })
  );
});


