const mockData = {
  route: "proof-docs/readme.md",
  validateTrue: [
    {
      href: 'https://nodejs.org/es/',
      text: 'Node.js',
      file: 'C:\\Users\\Vanesa\\Documents\\BOOTCAMP\\BOG005-md-links\\proof-docs\\readme.md',
      status: 200,
      txt: 'Ok'
    },
    {
      href: 'https://developers.google.com/v8/',
      text: 'motor de JavaScript V8 de Chrome',
      file: 'C:\\Users\\Vanesa\\Documents\\BOOTCAMP\\BOG005-md-links\\proof-docs\\readme.md',
      status: 200,
      txt: 'Ok'
    }
  ],
  validateFalse: [
    {
      href: 'https://nodejs.org/es/',
      text: 'Node.js',
      file: 'C:\\Users\\Vanesa\\Documents\\BOOTCAMP\\BOG005-md-links\\proof-docs\\readme.md'
    },
    {
      href: 'https://developers.google.com/v8/',
      text: 'motor de JavaScript V8 de Chrome',
      file: 'C:\\Users\\Vanesa\\Documents\\BOOTCAMP\\BOG005-md-links\\proof-docs\\readme.md'
  
    }
  ],
  stats: { Total: 2, Unique: 2 },
  statsAndValidate: { Total: 2, Unique: 2, Broken: 0 },
};

module.exports = {
  mockData,
};
