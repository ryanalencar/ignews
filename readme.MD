<div align="center">
  <img alt="ignews" src="https://raw.githubusercontent.com/ryanalencar/ignews/1c8164ad95d553ce61ff9f025b24679aaacf2b31/public/images/logo.svg" />
  <h1 align="center">Welcome to ignews 👋</h1>
</div>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/ryanalencar/ignews#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/ryanalencar/ignews/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
</p>

> Content subscription platform

### ✨ [Demo](https://ignews-ryanalencar.vercel.app/)

## About the project
It aims at studying and developing an application for listing posts and subscriptions in ReactJS with NextJS.

Using the NextJS framework, I built the application around concepts such as API consumption, API Root, Server Side Rendering, Static Site Generation, STRIPE for subscription payments, NextAuth for authentication with Github, FaunaDB for storing information, and Prismic CMS for adding and managing content to posts.

## Technologies
- ReactJs
- NextJs
- Typescript
- SASS
- Next-Auth
- Stripe
- FaunaDB
- Prismic CMS

## Install

```sh
# Install the dependencies
yarn
```

## Usage

```sh
# In the root of the project create a copy of the .env.local.example file
# Change the name of the copy to .env.local
# Fill in the environment variables according to the instructions
cp .env.local.example .env.local

# Run stripe listen to listen for webhook events
stripe listen --forward-to localhost:3000/api/webhooks 

# Start the application
yarn dev
```

## Run tests

```sh
yarn test
```

## Author

👤 **Ryan Alencar**

* Github: [@ryanalencar](https://github.com/ryanalencar)
* LinkedIn: [@ryanalencar](https://linkedin.com/in/ryanalencar)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/ryanalencar/ignews/issues). You can also take a look at the [contributing guide](https://github.com/ryanalencar/ignews/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!
 README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
