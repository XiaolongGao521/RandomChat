import express from 'express';
import fetch from 'node-fetch';

const app = express()

const api_key = process.env.API_KEY

async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/gpt2",
        {
            headers: { Authorization: `Bearer ${api_key}` },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
}

app.use(express.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", ['Content-Type'])
    next();
})

app.post('/airesponse', async (req, res) => {
    const response = await query(`My response to ${req.body.message} is`);
    res.send({message: response[0].generated_text});
});

app.listen(3000);