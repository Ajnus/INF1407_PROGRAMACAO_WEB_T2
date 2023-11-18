"use strict";
onload = function () {
    document.getElementById('insere').
        addEventListener('click', evento => { location.href = 'inserePub.html'; });
    exibeListaPubs(); // exibe lista de publicacoes ao carregar a página
};
function exibeListaPubs() {
    fetch(backendAddress + "forum/pub/lista/")
        .then(response => response.json())
        .then(pubs => {
        console.log(pubs);
        let campos = ['titulo', 'texto'];
        let tbody = document.getElementById('idtbody');
        tbody.innerHTML = "";
        for (let pub of pubs) {
            let tr = document.createElement('tr');
            for (let i = 0; i < campos.length; i++) {
                let td = document.createElement('td');
                let href = document.createElement('a');
                href.setAttribute('href', 'update.html?id=' + pub['id']);
                let texto = document.createTextNode(pub[campos[i]]); // Correção aqui
                td.appendChild(texto);
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
    })
        .catch(error => {
        console.error("Erro:", error);
    });
}
