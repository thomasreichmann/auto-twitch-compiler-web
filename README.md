# Auto Twitch compiler

Esse repo contem a front end do projeto, sendo um site criado utilizando react com tsx e firebase como hosting e database(noSQL). Esse site tem o proposito de prover um local para criar e editar os canais na database.

## Back End

A back end escrita em typescript usando express.js pode ser encontrada nesse [Repo](https://github.com/thomasreichmann/auto-twitch-compiler)

Os dois repos foram feitos para rodar em conjunto, com a front end provendo um local para criar e editar os canais e a back end processando os canais e gerando os vídeos.

## Hosting

O projeto esta utilizando Firebase como provedor de host, no momento ele pode ser encontrado [Aqui](https://auto-twitch-compiler.web.app/). Lembrando que no momento o projeto existe apenas para uso interno, então no momento apenas uma conta tem acesso a visualizar os canais na tabela.

Caso aja interesse em ver o projeto, a seção `Exemplos` abaixo contém fotos do projeto.

## Desenvolvimento local

-   Clone o repositório localmente
-   Rode `yarn i` para baixar as dependências do projeto
-   Rode `yarn start` para iniciar o site localmente para desenvolvimento

## Exemplos

Como o projeto foi feito para uso interno, essas fotos servem como exemplo da interface do webApp:

![](https://i.imgur.com/Gndy2Ky.png)

Tabela com todos os canais, cada canal tendo uma sessão expansível para visualizar suas configurações

---

![](https://i.imgur.com/eellg7h.png)

Dropdown de um canal com todas as configurações dele incluindo:

-   Informações básicas como nome, id
-   Title Template, que serve de base para a backend formar o titulo de um vídeo
-   Línguas, cada card com um language code significa a quantidade de clipes que serão pegos de cada língua para formar o video
-   Upload time. Os horarios em que videos serao feitos e subidos para o youtube
-   Atualizar. Botão que salva as informações na firestore e manda uma request para a backend atualizar os canais localmente
