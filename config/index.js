module.exports = {
  db: {
    // connectionString : "postgresql://business_user:business_password@192.168.55.50:5432/pd20",
    connectionString : "postgresql://sample:qwerty@192.168.66.79:5432/pd20",
    // user : 'business_user',
    // password : 'business_password',
    user : 'sample',
    password : 'qwerty',
    // host : '192.168.55.50',
    host : '192.168.66.79',
    port : '5432',
    database : 'pd20',
    poolSize : 5
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
  chat: {
    dialogTransferTimeout: 5*60*1000,
    searchTimeout: 5*1000
  }
}