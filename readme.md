# Lean-Coffee-Discord-Bot

![alt text](https://blog.osk.de/wp-content/uploads/2021/01/OSK-Blog_Discord-Guide_1280x480px-1280x480.jpg)

**This is a simple discord bot to send email notifications about creating, updating and deleting lean-coffee events.**

## Slash Commands

The bot provides the following slash commands:

- `/ping` replies with `pong`, an absolute must have for every serious bot
- `/server` replies with server name and member count
- `/user` replies with user tag, id and name
- `/lean-coffee` replies with the upcoming lean-coffee event

## Email Events

The main purpose of the bot is to send an email to a list of recipients, about creation, updates or canceling of a lean-coffee event.

The bot will only react to events which happen in a channel called `lean-coffee`.

## Tech Stack

- [discord.js](https://discord.js.org/#/docs/discord.js/stable/general/welcome) :fire:
- [nodemailer](https://nodemailer.com/about/) :mailbox:
- [docker](https://docs.docker.com/get-started/) :whale:

# Usage

To use the bot, you need to

- create a new application on the [discord developer portal](https://discord.com/developers/applications)
- add a bot inside that application
- generate an OAuth URL to link the bot to your discord server
  - make sure to activate `applications.commands` and `bot` in the OAuth URL Generator ![OAuth URL Generator](https://discordnet.dev/guides/int_basics/application-commands/slash-commands/images/oauth.png)
- add an .env file somewhere on your machine with the following credentials:

```
BOT_TOKEN=XXX
CLIENT_ID=XXX
GUILD_ID=XXX
CHANNEL_ID=XXX

MAIL_HOST=XXX
MAIL_USER=XXX
MAIL_PASS=XXX

MAIL_TO=exampleEmail1@gmail.com, john@doe.com, ...
```

- the mails get send via [nodemailer](https://nodemailer.com/about/), so make sure to add the correct mail-host for your provider
- you have two options to make the bot run:
  - clone the repo and run the app on your local node
  ```
  git clone git@github.com:florianGierlichs/discord-bot.git
  cd discord-bot
  npm i
  npm run deploy-commands && npm start
  ```
  - run the bot in his own docker container [floriangierlichs/lean-coffee-discord-bot](https://hub.docker.com/r/floriangierlichs/lean-coffee-discord-bot)
  ```
  docker run --env-file ./.env floriangierlichs/lean-coffee-discord-bot
  ```
  _make sure to add the correct path to your local .env file!_

## That`s it!

The bot should run and replie to your slash commands and lean-coffee events.

Feel free to clone the repo and extend the bot to your needs.

If you have any questions, you can open an issue on this repo.

## License

MIT

## Happy Coding :kissing_heart:
