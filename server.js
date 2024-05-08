const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const app_name="pollquest-ui";
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/'+app_name+'/api/data', async (req, res) => {
    try {

        const inputData = req.body.inputData;


        const apiResponse = await axios.post('', {
            inputData: inputData
        });

       
        res.json(apiResponse.data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});