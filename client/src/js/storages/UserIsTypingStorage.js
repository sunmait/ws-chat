class UserIsTypingStorage {
  constructor() {
    this.usernames = [];
  }

  addUser(username) {
    if (this.usernames.indexOf(username) === -1) {
      this.usernames.push(username);
    }
  }

  removeUser(username) {
    const index = this.usernames.indexOf(username);

    if (index !== -1) {
      this.usernames.splice(index, 1);
    }
  }

  getTypingUsers() {
    return this.usernames;
  }
}

export default new UserIsTypingStorage();