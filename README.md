# Atogatari

Anime screenshots image board made with love <3

- Client: [Create React App](https://github.com/facebookincubator/create-react-app), [Semantic UI React](https://github.com/Semantic-Org/Semantic-UI-React)
- Server: [Koa](https://github.com/koajs/koa), [MongoDB](https://www.mongodb.com/)

## Development

Install [MongoDB](https://docs.mongodb.com/manual/installation/) and [yarn](https://yarnpkg.com/en/docs/install).

```bash
cd server

# Setup environment variables
cp .env.example.js .env.js

# Install server dependencies, seed fake data and start dev server
yarn && yarn seed && yarn start

cd ../client

# Install client dependencies and start dev server
yarn && yarn start
```
