const { mdLinks } = require("../src/index");
const { mockData } = require("./mockData.js");
const { statsFiles, statsAndValidateFiles } = require("../src/functions.js");

describe("mdLinks", () => {
  it("mdLinks comprobando que es una función", () => {
    expect(typeof mdLinks).toBe("function");
  });

  it("mdLinks return validate true", () => {
    return mdLinks(mockData.route, { validate: true }).then((result) => {
      expect(result).toEqual(mockData.validateTrue);
    });
  });

  it("mdLinks return validate false", () => {
    return mdLinks(mockData.route, { validate: false }).then((result) => {
      expect(result).toEqual(mockData.validateFalse);
    });
  });
});

describe("statsFiles", () => {
  it("validate option --stats", () => {
    expect(statsFiles(mockData.validateTrue)).toEqual(mockData.stats);
  });

  it("validate option --stats --validate", () => {
    expect(statsAndValidateFiles(mockData.validateTrue)).toEqual(mockData.statsAndValidate);
  });
});
