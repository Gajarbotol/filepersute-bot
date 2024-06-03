const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

// replace the value below with the Telegram token you received from BotFather
const token = '7125865296:AAHI_w7KGa152kCOVPNgsavTNIfatUR0hX8';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Handle /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Welcome to FilePursuit Bot! Send me a message and I will search for files related to your message.');
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // Ignore /start command
  if(msg.text.toString().toLowerCase() === '/start') {
    return;
  }

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message');

  // make a request to the FilePursuit API
  axios.get(`https://filepursuit.com/api/search_api_v2.php?query=${msg.text}`)
    .then(response => {
      // send the first result from the FilePursuit API to the user
      bot.sendMessage(chatId, response.data[0].url);
    })
    .catch(error => {
      console.error(error);
      bot.sendMessage(chatId, 'Sorry, something went wrong.');
    });
});
