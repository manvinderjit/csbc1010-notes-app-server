const config = require('dotenv').config()
const cors = require('cors')
const express = require('express')
const mysql = require('mysql')

const healthRouter = require("./routes/health")
const notesRouter = require("./routes/notes")
const noteRouter = require("./routes/note")

if (config.error) {
  throw config.error
}

const port = process.env.PORT // || 3001
global.port = port

const corsOptions ={
  origin:'*', 
  credentials:true,
  optionSuccessStatus:200,
}

const app = express()
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/*
  TODO-1: Settup Database connection
*/
// create connection to database

// define database parameters
const db = mysql.createConnection ({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'notes'
});


// connect to database
db.connect((err) => {
  if (err) {
      throw err;
  }
  console.log('Connected to database');  
});
  

/*
  TODO-2: Upon database connection success, create the relavent table(s) if it does not exist.
*/

// define query for table creation
  const queryCreateTableNotes = `CREATE TABLE IF NOT EXISTS tb_notes(
    id INT primary key auto_increment,
    text varchar(200) NOT NULL,
    dateCreated DATE NOT NULL,
    lastModified TIMESTAMP NOT NULL
  )`;

// execute the query for table creation
  db.query(queryCreateTableNotes, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });
  
 // closes connection though not required 
  /*db.end(function(err) {
    if (err) {
      return console.log(err.message);
    }
  });*/

global.db = db;

app.get('/', (req, res) => {
  res.send('CSBC1010 Assignment 3 - My Notes')
})

app.use("/health", healthRouter)
app.use("/notes", notesRouter)
app.use("/note", noteRouter)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})

module.exports = db;