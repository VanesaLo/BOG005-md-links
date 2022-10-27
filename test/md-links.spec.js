const {existsFile} = require('../src/index');


describe('exists file', () => {

  it('should be a function', () => {
    expect(typeof existsFile).toBe('function');
  });

});
