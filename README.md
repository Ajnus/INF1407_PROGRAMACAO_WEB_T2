![the forum](https://github.com/Ajnus/THE_FORUM_PROGRAMACAO_WEB_INF1407_T2/assets/8205907/8027e58a-7196-4565-8599-c97ffd3af5b8)

# THE FORUM

# O que é o THE FORUM?

THE FORUM é o nosso projeto, o qual se baseia em um fórum online.

# Como funciona o THE FORUM?

Nele, o usuário terá acesso a uma lista de publicações, em que ele pode criar novas e alterar/deletar as suas.

Além disso, o usuario pode adicionar comentários a uma publicação, independente de se é sua ou de um terceiro.

Importante lembrar que - como a maioria dos fóruns - o THE FORUM é publico, mas para ver os textos das publicações e poder criar seus próprios é necessária uma autenticação.

# Guia de instalação 

1) Clone o repositório com:

git clone https://github.com/miguelpgarcia/INF1407_T2.git


2) BACK END

21) Dentro do repositório, ative o ambiente virtual do back end:


cd back/

source venv/bin/activate

22) Instale os requirements

pip install -r requirements.txt

23) Execute o app

python3 manage.py runserver


3) FRONT END

cd frontend/

cd public/

python3 -m http.server 8080




# O que foi implementado

Foram implementados: autenticação completa, o CRUD completo de Publicações e CRUD completo de Comentários (na nossa concepção, não faz sentido editar comentários) 


# O que não foi implementado

Durante o projeto tivemos mudanças de requisitos e optamos por fazer um Usuário com username, email e senha, sem considerar a data de nascimento que concluimos não ser tão relevante. Além disso, não conseguimos fazer a funcionalidade de "esqueci minha senha" enviar o email de fato e não foi possivel implementar o 'esqueci minha senha' e 'trocar senha'.

# INF1407_T2


Participantes: 

Miguel Garcia - 2120240
Jam Ajna Soares - 2211689
