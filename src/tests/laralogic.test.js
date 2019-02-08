const { authenticateUser, getUser, logOut } = require('../Logic/laralogic');
let user = {
  user_id: 10,
  username: 'Lara',
};
describe('login and register functions', () => {
  beforeEach(() => {
    user = {}
  })
  test('can log in', () => {
    expect(getUser(user)).toBeDefined();
  })
  it('should return an object', () => {
    expect(typeof user).toBe('object');    
})
  test('can register a new account', () => {
    let newUser = authenticateUser(user)
    expect(newUser.user_id).toBe(11);
    expect(newUser.username).toBe('Amy');
  })
  it('should return login data', () => {
    expect(getUser(user)).toBeDefined()
  })
  it('should return an object', () => {
    expect(typeof user).toBe('object')
  })
});
describe('logout user', () => {
  beforeEach(() => {
    user = {}
  })
  var user = {};
  test('can log out', () => {
    expect(user).toEqual({})
  })
});
