# marketeers-backend

Marketeers Backend Built with Node.js

## Prerequisites

1. MongogDB Instance installed localy or on Atlas Cloud
2. Nodejs latest version
3. git

## Installation

1. Clone the Repo

```
$ git clone
```

2. Install all the dependencies

```
$ npm install
```

3. Generate the Keys of the Application
   this keys would be used for cryptography operations

```
# make the keys directory
// for windows
$ mkdir src\keys
// for mac and linux
$ mkdir src/keys
// generate the keys (the following command must be executed from the Git bash terminal)
$ ssh-keygen -t rsa -b 4096 -m PEM -f src/keys/jwtRS256.key
# Don't add passphrase
$ openssl rsa -in src/keys/jwtRS256.key -pubout -outform PEM -out src/keys/jwtRS256.key.pub
```

4. Copy the `.env.example` file into a `.env` file

```
# for windows
$ copy .env.example .env /v

# for linux
$ cp .env.example .env
```

5. Assign Values to the Enviroments variables in the `.env` file
6. Start the Server

```
$ npm start
```

## Super Admin Acount Generation

```
$ npm run generate-super-admin
```

## API Documentation

- [The Admin Collection](https://documenter.getpostman.com/view/7218995/UVXhrGy4)
- [The Clients Collection](https://documenter.getpostman.com/view/7218995/UVXjHuxD)
- [The User Collection](https://documenter.getpostman.com/view/7218995/UVXjKvqu)
- [The Average Monthly Household Income Collection](https://documenter.getpostman.com/view/7218995/UVXjHuoQ)
- [The Categorey Collection](https://documenter.getpostman.com/view/7218995/UVXjHuoW)
- [The Incidence Rate Collection](https://documenter.getpostman.com/view/7218995/UVXjKvvL)
- [The Education Level Collection](https://documenter.getpostman.com/view/7218995/UVXjKvvK)
- [The Sample Size Collection](https://documenter.getpostman.com/view/7218995/UVXjKvvB)
- [The Countries Collection](https://documenter.getpostman.com/view/7218995/UVXjJbNd)
- [The Regions Collection](https://documenter.getpostman.com/view/7218995/UVXjKvvF)
- [The Panel Service Collection](https://documenter.getpostman.com/view/7218995/UVXjKw5A)
