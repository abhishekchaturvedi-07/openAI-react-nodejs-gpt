const chalk = require('chalk');
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const PORT = 8080

const app = express()
app.use(express.json())
app.use(cors())


const API_KEY = process.env.API_KEY

app.post('/chat/completions', async (req, res) => {
    const options = {
        method: 'POST',
        headers: {
            'Authorization':`Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            // prompt: req.body.message,
            // messages: [{ role: 'user', content: "how are you?" }],
            messages: [{"role": "user", "content": req.body.message}],
            max_tokens: 100
        })
    }
    try{
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        console.log('data --->  ', data)
        res.send(data)
    }
    catch(err){
        console.error(err)
    }
})


app.listen(PORT, () => {
    console.log(
        chalk.green(
            chalk.bgGreen(
                'BackEnd ' 
            )
            +
            chalk.hex('#FFA500')(
                ' ---> '
            )
            +
            chalk.blue.underline.bold(
                'Listening on PORT  '
            )
            +
            chalk.italic.hex('#FFA500')(
                ' : '+PORT + ' !!!' 
            )
    ));
})