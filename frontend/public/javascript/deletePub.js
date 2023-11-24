"use strict";
onload = () => {
    // Carrega os dados do banco de dados
    // e preenche o formulário
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const idPlace = document.getElementById('id');
    if (id) {
        console.log('id = ', id);
        console.log('idPlace =', idPlace);
        //idPlace.innerHTML = id;
        fetch(backendAddress + 'forum/pub/' + id + '/')
            .then(response => response.json())
            .then(pub => {
            // Adicione esta linha para exibir a mensagem desejada
            const mensagem = `Deseja apagar a publicação "${pub.titulo}"?`;
            const mensagemPlace = document.getElementById('mensagem');
            mensagemPlace.innerText = mensagem;
            // Adicione um listener para o botão de confirmação
            const botaoCancelar = document.getElementById('botaoCancelar');
            botaoCancelar.addEventListener('click', () => {
                // Redirecionar para index.html
                window.location.href = 'index.html';
            });
            const botaoConfirmar = document.getElementById('botaoConfirmar');
            botaoConfirmar.addEventListener('click', () => {
                console.log('Botão de confirmação clicado');
                // Adicione aqui a lógica para enviar a solicitação de exclusão ao backend
                const token = localStorage.getItem('token'); // Recupera o token de autenticação
                fetch(backendAddress + 'forum/pub/' + id + '/', {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Token ' + token,
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                    // Adicione aqui o tratamento da resposta do backend
                    console.log('Publicação excluída com sucesso!');
                    // Redirecione para alguma página após a exclusão
                    window.location.href = 'index.html';
                })
                    .catch(erro => {
                    console.error('Erro ao excluir publicação:', erro);
                });
            });
        })
            .catch(erro => {
            console.log('Deu erro: ' + erro);
        });
    }
    else {
        idPlace.innerHTML = 'URL mal formada: ' + window.location;
    }
};
