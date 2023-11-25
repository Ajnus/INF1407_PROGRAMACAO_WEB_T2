"use strict";
window.addEventListener('load', () => {
    // Verifica o username e coloca no cabeçalho da página
    const token = localStorage.getItem('token'); // Recupera o token de autenticação
    const loginRef = document.getElementById('loginRef');
    const signupRef = document.getElementById('SignupRef');
    const logoutRef = document.getElementById('logoutRef');
    // Check if token is not null before using it in the headers
    const headers = {
        'Content-Type': 'application/json',
    };
    if (token !== null) {
        headers['Authorization'] = token;
    }
    fetch(backendAddress + 'accounts/token-auth/', {
        method: 'GET',
        headers: headers,
    })
        .then(response => {
        response.json().then(data => {
            const usuario = data;
            if (response.ok) {
                // token enviado no cabeçalho foi aceito pelo servidor
                let objDiv = document.getElementById('logged');
                logoutRef.innerHTML = "| Log Out";
            }
            else {
                // token enviado no cabeçalho foi rejeitado pelo servidor
                usuario.username = 'visitante';
                loginRef.innerHTML = "| Log in";
                signupRef.innerHTML = "| Sign Up";
            }
            const spanElement = document.getElementById('identificacao');
            spanElement.innerHTML = usuario.username;
        });
    })
        .catch(erro => {
        console.log('[setLoggedUser] deu erro: ' + erro);
    });
});
