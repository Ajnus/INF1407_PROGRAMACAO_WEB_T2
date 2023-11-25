"use strict";
onload = () => {
    // Carrega os dados do banco de dados
    // e preenche o formulário
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const idPlace = document.getElementById('id');
    const tituloPlace = document.getElementById('titulo');
    const textoPlace = document.getElementById('texto');
    const autorPlace = document.getElementById('autor');
    console.log("a");
    if (id) {
        idPlace.innerHTML = id;
        fetch(backendAddress + 'forum/pub/public/' + id + '/')
            .then(response => response.json())
            .then(pub => {
            tituloPlace.innerHTML = pub['titulo'];
            console.log(pub['titulo']);
            textoPlace.innerHTML = pub['texto'];
            autorPlace.innerHTML = pub['autor_username'];
        })
            .catch(erro => {
            console.log('Deu erro: ' + erro);
        });
    }
    else {
        idPlace.innerHTML = 'URL mal formada: ' + window.location;
    }
    document.getElementById('insere')
        .addEventListener('click', evento => { location.href = 'insereCom.html?id=' + id; });
    exibeListaComs(id); // exibe lista de publicacoes ao carregar a página
};
function exibeListaComs(id) {
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
        return fetch(backendAddress + 'forum/pub/public/' + id + '/');
    })
        .then(response => response.json())
        .then(pub => {
        console.log(pub);
        console.log(username);
        let coms = pub.comentarios;
        let campos = ['autor_username', 'texto', 'deletar']; // Adicionei 'editar' como terceiro campo
        let tbody = document.getElementById('idtbody');
        tbody.innerHTML = "";
        for (let com of coms) {
            let tr = document.createElement('tr');
            for (let i = 0; i < campos.length; i++) {
                let td = document.createElement('td');
                if (campos[i] === 'deletar') {
                    if (com['autor_username'] === username) {
                        let href = document.createElement('a');
                        href.setAttribute('href', 'deleteCom.html?id=' + com['id']);
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
                    let texto = document.createTextNode(com[campos[i]]);
                    td.appendChild(texto);
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
