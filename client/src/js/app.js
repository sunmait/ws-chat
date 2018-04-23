import io from 'socket.io-client';
import chatService from './services/chatService';
import userService from './services/userService'
import userIsTypingService from './services/UserIsTypingService'

export default () => {
  userService.init();
  init();
}

const init = () => {
  const {username} = userService.getUserInfo();
  
  const socket = io({
    query: {username}
  });

  initOnSubmit((message) => socket.emit('chat message', message));
  userIsTypingService.initListener(
    $('#m'),
    () => socket.emit('user is typing', username)
  );

  socket.on('chat message', onChatMessage);
  socket.on('user joined', onUserJoined);
  socket.on('user left', onUserLeft);
  socket.on('user is typing', onUserIsTyping);
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

function onUserIsTyping(username) {
  userIsTypingService.onUserIsTypingUpdate(username);
}

function initOnSubmit(callback) {
  $('form').submit(() => {
    const value = $('#m').val();
    callback(value);
    $('#m').val('');

    return false;
  });
}
