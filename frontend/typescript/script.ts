onload = function () {
    (document.getElementById('insere') as HTMLButtonElement).
    addEventListener('click', evento => { location.href = 'inserePub.html' });
    exibeListaPubs(); // exibe lista de publicacoes ao carregar a página
    }

function exibeListaPubs() {
    fetch(backendAddress + "forum/pub/lista/")
        .then(response => response.json())
        .then(pubs => {
            console.log(pubs);
            let campos = ['titulo', 'texto'];
            let tbody = document.getElementById('idtbody') as HTMLTableSectionElement;
            tbody.innerHTML = "";
            for (let pub of pubs) {
                let tr = document.createElement('tr') as HTMLTableRowElement;
                for (let i = 0; i < campos.length; i++) {
                    let td = document.createElement('td') as HTMLTableCellElement;
                    let href = document.createElement('a') as HTMLAnchorElement;
                    href.setAttribute('href', 'update.html?id=' + pub['id']);
                    let texto = document.createTextNode(pub[campos[i]]) as Text;  // Correção aqui
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