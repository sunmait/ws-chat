import UserInfoService from './UserInfoService';

const userInfoService = new UserInfoService();

export default {
  init() {
    initUsername();
  },
  getUserInfo: () => userInfoService.getUserInfo(),
};

function initUsername() {
  let username = localStorage.getItem('username');

  if (!username) {
    username = prompt('Please enter your name');

    if (!username) {
      username = 'unknown';
    } else {
      localStorage.setItem('username', username);
    }
  }

  userInfoService.setUsername(username);
}
