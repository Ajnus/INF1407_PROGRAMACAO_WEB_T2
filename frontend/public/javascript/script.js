"use strict";
onload = function () {
    document.getElementById('insere')
        .addEventListener('click', evento => { location.href = 'inserePub.html'; });
    exibeListaPubs(); // exibe lista de publicacoes ao carregar a página
};
function exibeListaPubs() {
    const token = localStorage.getItem('token'); // Recupera o token de autenticação
    // Check if token is not null before using it in the headers
    const headers = {
        'Content-Type': 'application/json',
    };
    if (token !== null) {
        headers['Authorization'] = token;
    }
    let username = 'visitante';
    fetch(backendAddress + 'accounts/token-auth/', {
        method: 'GET',
        headers: headers,
    })
        .then(response => {
        return response.json();
    })
        .then(data => {
        const usuario = data;
        if (usuario.username) {
            username = usuario.username;
        }
        // Now that the first fetch is complete, initiate the second fetch
        return fetch(backendAddress + "forum/pub/lista/");
    })
        .then(response => response.json())
        .then(pubs => {
        console.log(pubs);
        console.log(username);
        let campos = ['titulo', 'autor_username', 'editar', 'deletar']; // Adicionei 'editar' como terceiro campo
        let tbody = document.getElementById('idtbody');
        tbody.innerHTML = "";
        for (let pub of pubs) {
            let tr = document.createElement('tr');
            for (let i = 0; i < campos.length; i++) {
                let td = document.createElement('td');
                if (campos[i] === 'editar') {
                    if (pub['autor_username'] === username) {
                        let href = document.createElement('a');
                        href.setAttribute('href', 'updatePub.html?id=' + pub['id']);
                        let texto = document.createTextNode("Editar");
                        href.appendChild(texto);
                        td.appendChild(href);
                    }
                    else {
                        let texto = document.createTextNode("");
                        td.appendChild(texto);
                    }
                }
                else {
                    if (campos[i] === 'deletar') {
                        if (pub['autor_username'] === username) {
                            let href = document.createElement('a');
                            href.setAttribute('href', 'deletePub.html?id=' + pub['id']);
                            let texto = document.createTextNode("Apagar");
                            href.appendChild(texto);
                            td.appendChild(href);
                        }
                        else {
                            let texto = document.createTextNode("");
                            td.appendChild(texto);
                        }
                    }
                    else {
                        if (campos[i] === 'titulo') {
                            let href = document.createElement('a');
                            href.setAttribute('href', 'visualizaPub.html?id=' + pub['id']);
                            let texto = document.createTextNode(pub[campos[i]]);
                            href.appendChild(texto);
                            td.appendChild(href);
                        }
                        else { // Caso contrário, adiciona um link para o campo correspondente
                            let texto = document.createTextNode(pub[campos[i]]);
                            td.appendChild(texto);
                        }
                    }
                }
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
    })
        .catch(error => {
        console.error("Erro:", error);
    });
}
