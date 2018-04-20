import io from 'socket.io-client';
import chatService from './services/chatService';
import userService from './services/userService'

export default () => {
  userService.init();
  init();
}

const init = () => {
  initOnSubmit(
    (message) => socket.emit('chat message', message)
  );

  const socket = io({
    query: {
      username: userService.getUserInfo().username
    }
  });

  socket.on('chat message', (msg, username) => {
    chatService.appendMessage(msg, username);
  });
}

function initOnSubmit(callback) {
  $('form').submit(() => {
    const value = $('#m').val();
    callback(value);
    $('#m').val('');

    return false;
  });
}