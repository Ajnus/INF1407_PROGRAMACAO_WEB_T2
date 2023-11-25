"use strict";
onload = () => {
    const signUp = () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const email = document.getElementById('email').value;
        fetch(backendAddress + 'accounts/create-user/', {
            method: 'POST',
            body: JSON.stringify({
                'username': username,
                'password': password,
                'email': email
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
            if (response.ok) {
                return response.json();
            }
            else {
                throw new Error('Falha na criação do usuário');
            }
        })
            .then(() => authenticate(username, password))
            .catch(error => {
            console.error('Error during signup:', error);
        });
    };
    const authenticate = (username, password) => {
        fetch(backendAddress + 'accounts/token-auth/', {
            method: 'POST',
            body: JSON.stringify({
                'username': username,
                'password': password,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
            if (response.ok) {
                return response.json();
            }
            else {
                throw new Error('Falha na autenticação');
            }
        })
            .then((data) => {
            const token = data.token;
            localStorage.setItem('token', token);
            console.log(token);
            window.location.replace('index.html');
        })
            .catch(error => {
            console.error('Error during authentication:', error);
        });
    };
    document.getElementById('btnSignUp').addEventListener('click', evento => {
        evento.preventDefault();
        signUp();
    });
};
