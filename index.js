import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());


app.get('/json-test', (req, res) => {
    res.send({
        message: 'json template'
    })
})

app.listen(3009, () => {
    console.log('@port 3009');
})