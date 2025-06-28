document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const token = '7697760576:AAEyhsr2z5qU5TY2ajxa7lvS-FLYOmuIHyA';
    const chat_id = '5352696360';
  
    const form = e.target;
    const formData = new FormData(form);
  
    const message = `
  <b>Нова заявка з сайту:</b>
  <b>Компанія:</b> ${formData.get('company')}
  <b>Ім’я:</b> ${formData.get('name')}
  <b>Email:</b> ${formData.get('email')}
  <b>Телефон:</b> ${formData.get('phone')}
  <b>Про проєкт:</b> ${formData.get('project')}
  `;
  
    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: chat_id,
        text: message,
        parse_mode: 'HTML'
      })
    })
    .then(response => {
      if (response.ok) {
        alert('✅ Дякуємо! Вашу заявку надіслано.');
        form.reset();
      } else {
        alert('❌ Помилка надсилання. Спробуйте ще раз.');
      }
    });
  });
  