const {Users}=require('./users')
const expect=require('expect')

describe('Users',() => {
  var users;
  beforeEach(() => {
    users=new Users();
    users.users=[{
      id:'1',
      name:'Mike',
      room:'Node course'
    },
    {
      id:'2',
      name:'Jen',
      room:'React course'
    },
    {
      id:'3',
      name:'Mush',
      room:'Node course'
    }]
    //console.log(users.users);
  })
  it('should add new user',() => {
    var users=new Users();
    var user=users.addUser('testid','Mush','Office fans')
    expect(users.users).toEqual([user]);
    // expect(user.id).toBe('testid')
    // expect(user.name).toBe('Mush')
    // expect(user.room).toBe('Office fans')
  })
  it('should return names for Node course',() => {
    console.log(users.users);
    var userList=users.getUserList('Node course');
    expect(userList).toEqual(['Mike','Mush'])
  });
  it('should return names for React course',() => {
    var userList=users.getUserList('React course');
    expect(userList).toEqual(['Jen'])
  });

  it('should remove a user',() => {
    var userId='1'
    var user=users.removeUser(userId);
    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  })

  it('should not remove a user',() => {
    var userId='99'
    var user=users.removeUser(userId);
    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  })

  it('should find user',() => {
    var userId='2'
    var user=users.getUser(userId);
    expect(user.id).toBe(userId);
  })

  it('should not find user',() => {
    var userId='9'
    var user=users.getUser(userId);
    expect(user).toNotExist();

  })
})
