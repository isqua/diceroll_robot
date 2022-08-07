# diceroll_robot

This is a source code of a telegram bot: https://t.me/diceroll_robot

The Bot helps you to generate some stuff randomly:
- send him a number and get a random number between 1 and your number
- send him two numbers and get a random number between these two
- send him a list of users or words and get a random pick from this list

## Development

Install dependencies:

```
npm install -g pnpm@7.8
pnpm install
```

Run tests:

```
npm test
```

Run the bot while watching sources:

```
export BOT_TOKEN=<token_obtained_from_botfather>
npm run dev
```

## Technologies

- [typescript](https://www.typescriptlang.org) language and [nodejs](https://nodejs.org/dist/latest-v16.x/docs/api/) as a platform
- [telegraf](https://www.npmjs.com/package/telegraf) library for working with the Telegram Bot API
- [jest](https://jestjs.io) as a test runner, [nock](https://www.npmjs.com/package/nock) for mocking network requests and [fast-check](https://www.npmjs.com/package/fast-check) for property based testing
- [Github Actions](https://docs.github.com/en/actions) for CI
- [Heroku](https://www.heroku.com) as hosting
