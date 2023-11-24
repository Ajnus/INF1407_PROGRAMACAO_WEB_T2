onload = function () {
    (document.getElementById('insere') as HTMLButtonElement)
        .addEventListener('click', evento => { location.href = 'inserePub.html' });
    exibeListaPubs(); // exibe lista de publicacoes ao carregar a página
}

function exibeListaPubs() {
    fetch(backendAddress + "forum/pub/lista/")
        .then(response => response.json())
        .then(pubs => {
            console.log(pubs);
            let campos = ['titulo', 'autor_username', 'editar','deletar']; // Adicionei 'editar' como terceiro campo
            let tbody = document.getElementById('idtbody') as HTMLTableSectionElement;
            tbody.innerHTML = "";
            for (let pub of pubs) {
                let tr = document.createElement('tr') as HTMLTableRowElement;
                for (let i = 0; i < campos.length; i++) {
                    let td = document.createElement('td') as HTMLTableCellElement;
                    if (campos[i] === 'editar') {
                        let href = document.createElement('a') as HTMLAnchorElement;
                        href.setAttribute('href', 'updatePub.html?id=' + pub['id']);
                        let texto = document.createTextNode("Editar") as Text;
                        href.appendChild(texto);
                        td.appendChild(href);
                    } else {
                            if (campos[i] === 'deletar'){
                                let href = document.createElement('a') as HTMLAnchorElement;
                                href.setAttribute('href', 'deletePub.html?id=' + pub['id']);
                                let texto = document.createTextNode("Apagar") as Text;
                                href.appendChild(texto);
                                td.appendChild(href);                               
                            }
                            else {
                                if(campos[i] === 'titulo'){
                                    let href = document.createElement('a') as HTMLAnchorElement;
                                    href.setAttribute('href', 'visualizaPub.html?id=' + pub['id']);
                                    let texto = document.createTextNode(pub[campos[i]]) as Text;
                                    href.appendChild(texto);
                                    td.appendChild(href);
                                }
                                else {                                                           // Caso contrário, adiciona um link para o campo correspondente
                                    let texto = document.createTextNode(pub[campos[i]]) as Text;
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
