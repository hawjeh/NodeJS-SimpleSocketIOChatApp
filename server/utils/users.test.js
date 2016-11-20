const expect = require('expect');

const {
  Users
} = require('./users');

describe('Users', () => {

  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    }, {
      id: '2',
      name: 'Jen',
      room: 'React Course'
    }, {
      id: '3',
      name: 'Julie',
      room: 'Node Course'
    }];
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Andrew',
      room: 'The Office Fans'
    };
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    var user = users.removeUser('1');
    expect(user.name).toBe('Mike');
    expect(users.users.length).toBe(2);
  });

  it('should not remove user', () => {
    var user = users.removeUser('4');
    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    var user = users.getUser('1');
    expect(user.name).toBe('Mike');
  });

  it('should not find user', () => {
    var user = users.getUser('4');
    expect(user).toNotExist();
  });

  it('should find user with unique name in a room', () => {
    var user = users.getUserInSameRoom('Mike', 'Node Course');
    expect(user.length).toBe(1);
  });

  it('should not find user with same name in a room', () => {
    var user = users.getUserInSameRoom('Mikey', 'Node Course');
    expect(user.length).toBe(0);
  });

  it('should return names for node course', () => {
    var userList = users.getUserList('Node Course');

    expect(userList).toEqual(['Mike', 'Julie']);
  });

  it('should return names for react course', () => {
    var userList = users.getUserList('React Course');

    expect(userList).toEqual(['Jen']);
  });

});
