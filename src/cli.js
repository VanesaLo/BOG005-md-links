#!/usr/bin/env node

const chalk = require("chalk");
const { mdLinks } = require("./index.js");
const { statsFiles, statsAndValidateFiles } = require("./functions.js");

const argv = process.argv;
const pathArg = process.argv[2];

const cli = (argv, pathArg) => {
  if (pathArg === undefined) {
    console.log(chalk.red("The path is invalid"));
  } else if(argv.includes("--stats")) {
    mdLinks(pathArg, {validate:true}).then((res) => console.log(statsFiles(res)));
  } else if(argv.includes("--validate")) {
    mdLinks(pathArg, {validate:true}).then((res) => console.log(res));
  } else if(argv.includes("--stats") && argv.includes("--validate")) {
    mdLinks(pathArg, {validate:true}).then((res) => console.log(statsAndValidateFiles(res)));
  } else if(argv <= 3) {
    mdLinks(pathArg, {validate:false}).then((res) => console.log(res));
  } else if(argv !== "--stats" || argv !== "--validate" || argv !== undefined){
    console.log(chalk.blue("The option is invalid, try with --validate, --stats or --stats --validate"));
  }
};

cli(argv, pathArg);