import mysql2 from 'mysql2/promise'

const database = mysql2.createPool( {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'celerates_b7_2024',
    waitForConnections: true,
    connectionLimit: 10,
    connectTimeout: 10000,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
  } )

  database
  .getConnection()
      .then(() => console.log(`Connected to the database`))
      .catch((err) => console.error(`Connection to database FAILED! ${err}`));

export default database