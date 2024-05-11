const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.get('/',cors(), (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/questions/:question_id',cors(), async (req, res) => {
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