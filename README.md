# D3 Blackjak Take-Home Test

**Author:** Santiago Osella (_@syntaxbliss_)

**Email:** osellasantiago1986@gmail.com

## Server setup
1. Install the required dependencies using the package manager of your choice.
* If using NPM, run `npm i`
* If using Yarn, run `yarn install`
2. Copy-paste the `.env.example` file and rename it as `.env.local`. Then fill in the following variables:
  * `APP_PORT`: the port used by the server. Make sure to not choose `3000`, since it is reserved for the client.
  * `CLIENT_URL`: URL from where the server will receive requests.

Example:

```
APP_PORT=8000
CLIENT_URL="http://localhost:3000"
```

3. Launch the server:
* If using NPM, run `npm run start:dev`
* If using Yarn, run `yarn start:dev`

## Client setup
1. Install the required dependencies using the package manager of your choice.
* If using NPM, run `npm i`
* If using Yarn, run `yarn install`
2. Copy-paste the `.env.example` file and rename it as `.env.local`. Then fill in the following variable:
  * `REACT_APP_API_URL`: URL used by the server, port included.

Example:

```
REACT_APP_API_URL="http://localhost:8000"
```

3. Launch the client:
* If using NPM, run `npm start`
* If using Yarn, run `yarn star`
