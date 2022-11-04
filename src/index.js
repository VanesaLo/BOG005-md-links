const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

const {
  pathAbsolute,
  getFiles,
  getLinks2,
  validateHTTP,
} = require("./functions.js");

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
  mdLinks,
};
