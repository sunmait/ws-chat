import BEM from 'react-bem-helper';

const classes = new BEM({
  name: 'chat-message',
  outputIsString: true
})

const userIsTypingBlockId = 'user-is-typing-block';
const userIsTypingId = 'user-is-typing';

class ChatService {
  appendMessage(msg, username) {
    const messageElem = $('<li>');
    messageElem.addClass(classes())

    const usernameElem = $('<span></span>');
    usernameElem.addClass(classes('username'));
    usernameElem.text(`${username} :`);

    const messageTextElem = $('<span></span>');
    messageTextElem.addClass(classes('message'))
    messageTextElem.text(msg);

    messageElem.append(usernameElem);
    messageElem.append(messageTextElem);

    $('#messages').append(messageElem);
  }

  showUserIsTypingBlock(usernames) {
    const userIsTypingElement = $(`#${userIsTypingId}`);
    const alreadyShown = userIsTypingElement.length;
    const text = getUserIsTypingText(usernames);

    if (alreadyShown) {
      userIsTypingElement.text(text);
      return;
    }
    
    const element = $('<span></span>');
    element.attr('id', userIsTypingId);
    element.text(text);

    $(`#${userIsTypingBlockId}`).append(element);
  }

  removeUserIsTypingBlock() {
    $(`#${userIsTypingId}`).remove();
  }
}

function getUserIsTypingText(usernames) {
  const names = usernames.join(', ');

  return usernames.length > 1 ? 
    `${names} are typing...` : `${names} is typing...`;
}

export default new ChatService();