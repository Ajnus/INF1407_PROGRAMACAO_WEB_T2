"use strict";
onload = () => {
    document.getElementById('btnSignUp').addEventListener('click', evento => {
        evento.preventDefault();
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
            .then((response) => {
            if (response.ok) {
                return response.json();
            }
            else {
                if (response.status == 401) {
                }
                throw new Error('Falha na autenticação');
            }
        })
            .then(() => {
            // Check if 'msg' is not null before accessing its properties
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
                .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    if (response.status == 401) {
                    }
                    throw new Error('Falha na autenticação');
                }
            })
                .then((data) => {
                const token = data.token;
                localStorage.setItem('token', token);
                console.log(token);
                window.location.replace('index.html');
            })
                .catch(erro => {
                console.log(erro);
            });
        })
            .catch(erro => {
            console.log(erro);
        });
    });
};
