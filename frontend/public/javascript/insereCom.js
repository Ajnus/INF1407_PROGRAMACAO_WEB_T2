"use strict";
onload = () => {
    document.getElementById('insere').addEventListener('click', evento => {
        evento.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        const elements = document.getElementById('meuFormulario').elements;
        let data = {};
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            data[element.name] = element.value;
        }
        // Check if id is not null before assigning it
        if (id !== null) {
            data['idPublicacao'] = id;
        }
        const token = localStorage.getItem('token');
        // Check if token is not null before using it in the headers
        const headers = {
            'Content-Type': 'application/json',
        };
        if (token !== null) {
            headers['Authorization'] = 'Token ' + token;
        }
        fetch(backendAddress + "forum/com/cria/", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: headers,
        })
            .then(response => {
            if (response.ok) {
                document.getElementById('mensagem').innerHTML = 'Dados inseridos com sucesso';
            }
            else {
                document.getElementById('mensagem').innerHTML = 'Dados inseridos com erro';
            }
        })
            .catch(error => {
            console.log(error);
        });
    });
};
