const { authenticateUser, getUser, logOut } = require('../Logic/laralogic');

describe('test login function', () => {
  beforeEach(() => {
    user = {}
  })
  test('can log in', () => {
    let userInfo = getUser(user);
    expect(getUser(user)).toBeDefined();
    expect(userInfo.user_id).toEqual(10);
    expect(userInfo.username).toBe('Lara');
    })
  it('should return an object', () => {
    expect(typeof user).toBe('object');    
    })
  });

describe('test register function', () => {
  beforeEach(() => {
    user = {}
  })
  test('can register a new account', () => {
    let newUser = authenticateUser(user)
    expect(newUser.user_id).toBe(11);
    expect(newUser.username).toBe('Amy');
    })
  it('should return login data', () => {
    expect(getUser(user)).toBeDefined()
    })
  });

describe('logout user', () => {
  beforeEach(() => {
    user = {}
  })
  test('can log out', () => {
    expect(logOut(user)).toEqual({})
  })
});
