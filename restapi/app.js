//importation of dependencies
const express = require('express');
const mysql = require('mysql');

//initialisation of express
const app = express();
const port = 3000;

//initialisation of database
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'lstdb'
});

//connection
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

//middleware to parse JSON
app.use(express.json());

//routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

//start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})

//user endpoints
app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    })
})

const cors = require('cors'); // Import the cors middleware

// Use cors middleware to enable all CORS origins
app.use(cors());
