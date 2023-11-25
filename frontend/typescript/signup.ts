onload = () => {
    const signUp = () => {
        const username: string = (document.getElementById('username') as HTMLInputElement).value;
        const password: string = (document.getElementById('password') as HTMLInputElement).value;
        const email: string = (document.getElementById('email') as HTMLInputElement).value;

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
            } else {
                throw new Error('Falha na criação do usuário');
            }
        })
        .then(() => authenticate(username, password))
        .catch(error => {
            console.error('Error during signup:', error);
        });
    };

    const authenticate = (username: string, password: string) => {
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
            } else {
                throw new Error('Falha na autenticação');
            }
        })
        .then((data: { token: string }) => {
            const token: string = data.token;
            localStorage.setItem('token', token);
            console.log(token);
            window.location.replace('index.html');
        })
        .catch(error => {
            console.error('Error during authentication:', error);
        });
    };

    (document.getElementById('btnSignUp') as HTMLInputElement).addEventListener('click', evento => {
        evento.preventDefault();
        signUp();
    });
};
