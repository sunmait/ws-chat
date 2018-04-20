import BEM from 'react-bem-helper';

const classes = new BEM({
  name: 'chat-message',
  outputIsString: true
})

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
}

export default new ChatService();