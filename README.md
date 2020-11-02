# sitepoint-telegram-bot
Code base for Sitepoint article to build bookmark telegram bot

Configuração
  - crie um arquivo .env e cole a chave do token to Telegram.
  ex: TOKEN=seuTokenDoTelegram
  - no arquivo client-watson.js faça os ajustes no campo "iam_apikey" colando os seus dados de config do watson
  - em app.js add em "workspace_id" o id do seu espaço de trabalho no watson
  
Inicializando
  - npm install
  - npm start

Codigos do Watson para o Backend
  - 000A - Succubus para Watson, o faz cumprimentar.
  - 0001 - Watson informa a Succubus que ela deve solicitar resposta ao usuário.