export default class UserInfoService {
  constructor(initiData = {}) {
    this.username = initiData.username;
  }

  setUsername(username) {
    this.username = username;
  }

  getUserInfo() {
    return {
      username: this.username,
    };
  }
}

