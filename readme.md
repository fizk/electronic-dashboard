

## Development
Uses Webpack (for client) and TSC (for server)

```sh
npm run ...
```

* **dev** Runs the Server in dev mode
* **watch-server** Listen for file changes and compiles server code (TS -> JS)
* **watch-client** Listens for file changes and compiles and bundles js/css client code


## Production 
Uses [PM2](https://pm2.keymetrics.io/) for production

### Start the server with PM2 process manager
```sh
./node_modules/.bin/pm2 start --name app ./server/index.js
```

### Restarts the server after an update
```sh
./node_modules/.bin/pm2 restart app
```

### Stops the server
```sh
./node_modules/.bin/pm2 stop app
```

### Deletes the process
```sh
./node_modules/.bin/pm2 delete app
```