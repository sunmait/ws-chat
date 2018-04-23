import userIsTypingStorage from '../storages/UserIsTypingStorage';
import chatService from './chatService';

class UserIsTypingService {
  constructor() {
    this.inputElement = null;;
    this.interval = null;
  }

  /**
   * Init listener that notify server that user is typing
   */
  initListener(inputElement, callback) {
    this.inputElement = inputElement;;
    
    $(this.inputElement).on('keydown', () => {
      if (this.interval !== null) {
        return;
      }

      callback();

      this.interval = setTimeout(() => {
        callback();

        this.interval = null;
      }, 1500);
    });
  }

  onUserIsTypingUpdate(username) {
    userIsTypingStorage.addUser(username);
    chatService.showUserIsTypingBlock(
      userIsTypingStorage.getTypingUsers()
    );

    setTimeout(() => {
      userIsTypingStorage.removeUser(username);

      if (!userIsTypingStorage.getTypingUsers().length) {
        chatService.removeUserIsTypingBlock();
      }
    }, 3000);
  }
}

export default new UserIsTypingService();