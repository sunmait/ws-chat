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

  socket.on('chat message', onChatMessage);
  socket.on('user joined', onUserJoined);
  socket.on('user left', onUserLeft);
}

function onChatMessage(msg, username) {
  chatService.appendMessage(msg, username);
}

function onUserJoined(username) {
  const msg = `'${username}' has joined a channel`;
  const user = 'CHAT';

  chatService.appendMessage(msg, user);
}

function onUserLeft(username) {
  const msg = `'${username}' has left a channel`;
  const user = 'CHAT';

  chatService.appendMessage(msg, user);
}

function initOnSubmit(callback) {
  $('form').submit(() => {
    const value = $('#m').val();
    callback(value);
    $('#m').val('');

    return false;
  });
}