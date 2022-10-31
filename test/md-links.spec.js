const {existsFile, mdLinks} = require('../src/index');


describe('existsFile', () => {

  it('should be a function', () => {
    expect(typeof existsFile).toEqual('function');
  });

});
