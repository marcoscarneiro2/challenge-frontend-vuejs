<p>
    <img src="https://s3.amazonaws.com/img-intercase/wp-content/uploads/2018/10/24205748/logoWebsite1.png" width="300">    
</p>

## Desafio para candidatos à posição de Desenvolvedor Front-end + Vuejs (Pleno/Sênior).
Caro desenvolvedor, nesse teste analisaremos seu conhecimento geral, organização de código e padrões de projeto. 
Abaixo explicaremos tudo o que será necessário.

## Instruções:
O desafio consiste em implementar uma aplicação Web SPA utilizando o vuejs.
Você irá criar uma aplicação que consumirá dois endpointes.

* Lista de filmes/series
https://vue-flix-backend.herokuapp.com/media/{type}/search/{page}

``
{type} = movie ou tv
``

``
{page} = número da pagina.
``

* Detalhes do filme/serie
https://vue-flix-backend.herokuapp.com/media/{type}/{id}

``
{id} = id da media, retornado na api anterior
``

## Tecnologias a serem utilizadas
* HTML
* CSS
* Vuejs
* Bootstrap

## Considerações
+ Não é permitido uso de jquery
+ Deve-se utilizar o @vue/cli para criar o corpo do projeto
+ O layout/UX dessa aplicação fica a cargo desenvolvedor (isso também será avaliado).
+ O resultado final do projeto deverá conter 3 paginas:
    + Lista de filmes, em forma de card
    + Lista de séries, em forma de card
    + Uma pagina de detalhamento do filme/série

## Entrega:
Para iniciar o teste, faça um fork deste repositório, crie uma branch com o seu nome completo (ex: fulanodossantos) e depois envie-nos o pull request. 
Se você apenas clonar o repositório não vai conseguir fazer push e depois vai ser mais complicado fazer o pull request.

Envie também seu currículo para devteam@intercase.com.br, caso ainda não tenha feito.

### Bônus:
A entrega desses requisitos será considerado como um diferencial para a vaga, mas não é obrigatório.

+ Implementar sistema de paginação.
+ Implementar filtro por gênero.

* EndPoint de gêneros
https://vue-flix-backend.herokuapp.com/genres/{type}

* Filtrar filmes/séries por gênero
https://vue-flix-backend.herokuapp.com/media/movie/search/1?genre={genre}year={year}

``
{genre} = id do gênero
``

``
{year} = ano de lançamento do filme/serie. ex: 2020
``

## Nossa análise
* Organização do código.
* Separação de módulos.
* Legibilidade.
* Comentários.

## Qualquer dúvida sobre esse teste, favor enviar um email para devteam@intercase.com.br


# Boa sorte!!!!
O 
