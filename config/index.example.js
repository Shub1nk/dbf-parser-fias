module.exports = {
  db: {
    connectionString : "",
    user : '',
    password : '',
    host : '',
    port : '',
    database : '',
    poolSize : 2
  },
  http: {
    port: 9000
  },
  app : {
    env: "dev"
  },
  fs: {
    hostname: ""
  },
  email: {
    host: 'localhost',
    port: 8080,
    path: `/email`
  },
  chat: {
    dialogTransferTimeout: 300000,
    searchTimeout: 5000
  }
}
