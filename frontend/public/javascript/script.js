"use strict";
onload = function () {
    document.getElementById('insere')
        .addEventListener('click', evento => { location.href = 'inserePub.html'; });
    exibeListaPubs(); // exibe lista de publicacoes ao carregar a página
};
function exibeListaPubs() {
    fetch(backendAddress + "forum/pub/lista/")
        .then(response => response.json())
        .then(pubs => {
        console.log(pubs);
        let campos = ['titulo', 'texto', 'editar']; // Adicionei 'editar' como terceiro campo
        let tbody = document.getElementById('idtbody');
        tbody.innerHTML = "";
        for (let pub of pubs) {
            let tr = document.createElement('tr');
            for (let i = 0; i < campos.length; i++) {
                let td = document.createElement('td');
                if (campos[i] === 'editar') {
                    // Se o campo for 'editar', adiciona um botão de edição
                    //console.log(campos[i])
                    let editarButton = document.createElement('button');
                    editarButton.innerText = 'Editar';
                    editarButton.addEventListener('click', () => {
                        location.href = 'updatePub.html?id=' + pub['id'];
                    });
                    td.appendChild(editarButton);
                }
                else {
                    // Caso contrário, adiciona um link para o campo correspondente
                    let texto = document.createTextNode(pub[campos[i]]);
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
