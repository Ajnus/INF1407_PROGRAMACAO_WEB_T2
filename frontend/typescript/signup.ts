onload = () => {
    (document.getElementById('btnSignUp') as HTMLInputElement).addEventListener('click', evento => {
        evento.preventDefault();
        const username: string = (document.getElementById('username') as HTMLInputElement).value;
        const password: string = (document.getElementById('password') as HTMLInputElement).value;
        const email: string = (document.getElementById('email') as HTMLInputElement).value;

        const DeployBackAddress = "http://miguelgarcia2.pythonanywhere.com/";

        fetch(DeployBackAddress + 'accounts/create-user/', {
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
        .then((response: Response) => {
            if (response.ok) {
                return response.json();
            } else {
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
                .then((response: Response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        if (response.status == 401) {
                        }
                        throw new Error('Falha na autenticação');
                    }
                })
                .then((data: { token: string }) => {
                    const token: string = data.token;
                    localStorage.setItem('token', token);
                    console.log(token);
                    window.location.replace('index.html');
                })
                .catch(erro => {
                    console.log(erro);
                });
            }
        )
        .catch(erro => {
            console.log(erro);
        });
    });
};
