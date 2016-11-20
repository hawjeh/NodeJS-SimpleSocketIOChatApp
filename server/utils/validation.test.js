const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    var resp = isRealString(98);
    expect(resp).toBe(false);
  });

  it('should reject string only spaces', () => {
    var resp = isRealString('   ');
    expect(resp).toBe(false);
  });

  it('should string with non-space characters', () => {
    var resp = isRealString('  Andrew  ');
    expect(resp).toBe(true);
  });
});
