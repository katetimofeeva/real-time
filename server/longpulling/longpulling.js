const express = require ('express')
const cors = require ('cors')
const events = require ('events')

const PORT = 5000

const imitter = new events.EventEmitter()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/get-message', (req, res)=>{
    imitter.once('new message', (msg)=>{ 
        res.json(msg)
    })
})
app.post('/new-message', (req, res)=>{
    const messange = req.body
    imitter.emit('new message', messange)
    res.status(200)
})

app.listen(PORT, ()=> console.log(`server was startev on ${PORT} port`))