document.getElementById('feedbackForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Дополнительная валидация email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        document.getElementById('responseMessage').textContent = 'Введите корректный email!';
        document.getElementById('responseMessage').style.color = 'red';
        return;
    }

    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('responseMessage').textContent = data;
        document.getElementById('responseMessage').style.color = 'green';
    })
    .catch(error => {
        console.error('Ошибка:', error);
        document.getElementById('responseMessage').textContent = 'Произошла ошибка при отправке.';
        document.getElementById('responseMessage').style.color = 'red';
    });
});