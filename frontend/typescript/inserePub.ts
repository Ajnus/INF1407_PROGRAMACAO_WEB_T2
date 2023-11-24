onload = () => {
    (document.getElementById('insere') as HTMLButtonElement).addEventListener('click', evento => {
    evento.preventDefault();
    const elements = (document.getElementById('meuFormulario') as HTMLFormElement).elements;
    let data: Record<string, string> = {};
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i] as HTMLInputElement;
        data[element.name] = element.value;
    }
    const token = localStorage.getItem('token'); // Recupera o token de autenticação

    // Check if token is not null before using it in the headers
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (token !== null) {
        headers['Authorization'] = 'Token ' + token;
    }   

    fetch(backendAddress + "forum/pub/cria/", {
        method: 'POST', body: JSON.stringify(data),
        headers: headers
    })
    .then(response => {
    if(response.ok) {
        (document.getElementById('mensagem') as HTMLDivElement).innerHTML = 'Dados inseridos com sucesso'
    } else {
        (document.getElementById('mensagem') as HTMLDivElement).innerHTML = 'Dados inseridos com erro'
        }
    })
    .catch(error => { console.log(error) })
    });
}