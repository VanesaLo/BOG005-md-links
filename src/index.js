const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const route = "proof-docs";
const routeFile = "proof-docs\PRUEBA2.md";

const { pathAbsolute, getFilesMD, getLinks, validateHTTP} = require("./functions.js");

// //console.log(chalk.blue(path));
// function existsFile(route) {
//   if (fs.existsSync(path) === true) {
//     (console.log(chalk.magenta(path)));
//   } else {
//     (new Error("the path doesn't exists"));
//   }
//   return fs.existsSync(route);
// }




const mdLinks = (path, options = { validate: true}) => {
  return new Promise((resolve, reject) => {
    const absolutePath = pathAbsolute(path);
    const files = getFilesMD(absolutePath);
    const links = getLinks(files);
    if (options.validate === false) {
      resolve(links);
    } else {
      validateHTTP(links).then((res) =>{
        resolve(res)
      })

      
     
    }
  })
}
mdLinks(route).then((data)=>{
  console.log(data);
}),


module.exports = () => {
  mdLinks
};
