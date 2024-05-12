const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
//const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(cors());
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/questions/:question_id', async (req, res) => {
    try{
        const question_id = req.params.question_id;
        res.render('question', { question_id });
    }catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send("Internal Server Error");
    }
    
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
});