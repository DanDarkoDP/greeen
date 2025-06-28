// server.js
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public')); // Щоб HTML + JS підключались

const TOKEN = '7697760576:AAEyhsr2z5qU5TY2ajxa7lvS-FLYOmuIHyA';
const CHAT_ID = '5352696360';

app.post('/send-message', async (req, res) => {
  const { company, name, email, phone, project } = req.body;

  const message = `
<b>Нова заявка з сайту:</b>
<b>Компанія:</b> ${company}
<b>Ім’я:</b> ${name}
<b>Email:</b> ${email}
<b>Телефон:</b> ${phone}
<b>Про проєкт:</b> ${project}
`;

  try {
    await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: message,
      parse_mode: 'HTML',
    });
    res.status(200).send({ ok: true });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send({ error: 'Помилка надсилання' });
  }
});

app.listen(3000, () => console.log('Сервер запущений на http://localhost:3000'));
