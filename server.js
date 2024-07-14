const PORT = 8000
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
require('dotenv').config()

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyBchNPDBj588XFPF0lxsB4NdqT7wVbyxAE")

app.post('/gemini',async (req, res) =>{
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"})
    const chat = model.startChat({
        history: req.body.history

    } )

    const msg = req.body.message
    console.log(msg);
    const result = await chat.sendMessage(msg)
    const response = await result.response
    const text = response.text()
    console.log(text);
    res.send(text)
})

app.listen(PORT, ()=> console.log("listening on port",PORT))


