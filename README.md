# Atogatari

Anime screenshots image board made with love <3

- Client: [Create React App](https://github.com/facebookincubator/create-react-app), [Semantic UI React](https://github.com/Semantic-Org/Semantic-UI-React)
- Server: [Koa](https://github.com/koajs/koa), [MongoDB](https://www.mongodb.com/)

## Development

Install [MongoDB](https://docs.mongodb.com/manual/installation/) and [yarn](https://yarnpkg.com/en/docs/install).

Set up environment variables for the app:

```
cd server
cp .env.example.js .env.js
```

Install dependencies and start app:

```
cd server
yarn && yarn seed && yarn start

cd ../client
yarn && yarn start
```
