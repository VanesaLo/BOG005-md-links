#!/usr/bin/env node

const chalk = require("chalk");
const { mdLinks } = require("./index.js");
const { statsFiles, statsAndValidateFiles } = require("./functions.js");

const argv = process.argv;
const pathArg = process.argv[2];

const cli = (pathArg, argv) => {
  if (pathArg === undefined) {
    console.log(chalk.red("The path is invalid"));
  } else if (argv.includes("--stats") && argv.includes("--validate")) {
    mdLinks(pathArg, { validate: true })
      .then((res) => {
        console.log(statsAndValidateFiles(res));
      })
      .catch((reject) => {
        console.log(chalk.green("The route is invalid", reject));
      });
  } else if (argv.includes("--validate")) {
    mdLinks(pathArg, { validate: true })
      .then((res) => {
        console.log(res);
      })
      .catch((reject) => {
        console.log(
          chalk.magenta("The file or directoy does not exist", reject)
        );
      });
  } else if (argv <= 3) {
    mdLinks(pathArg, { validate: false })
      .then((res) => {
        console.log(res);
      })
      .catch((reject) => {
        console.log(chalk.magenta(("The argument is invalid", reject)));
      });
  } else if (argv.includes("--stats")) {
    mdLinks(pathArg, { validate: true })
      .then((res) => {
        console.log(statsFiles(res));
      })
      .catch((reject) => {
        console.log(
          chalk.magenta("The file or directoy does not exist", reject)
        );
      });
  } else if (
    argv !== "--stats" ||
    argv !== "--validate" ||
    argv !== undefined
  ) {
    console.log(
      chalk.blue(
        "The option is invalid, try with --validate, --stats or --stats --validate"
      )
    );
  }
};

cli(pathArg, argv);
