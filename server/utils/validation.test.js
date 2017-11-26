const expect=require('expect')
const {isRealString}=require('./validation')

describe('isRealString',() => {
  it('should reject non string values',() => {
    var res=isRealString(80);
    expect(res).toBe(false)
  })
  it('should reject strings with only spaces',() => {
    var res=isRealString('  ');
    expect(res).toBe(false)
  })
  it('should allow string values with non space chars',() => {
    var res=isRealString('  Hithere  ');
    expect(res).toBe(true)
  })
})
