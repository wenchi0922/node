var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

var dbURL = 

var Message = mongoose.model('Message', {
    name: String,
    message: String
})

app.get('/messages', (req,res) => {
    Message.find({}, (err, messages) => {
        res.send(messages)
    })
})

app.post('/messages', (req,res) => {
    var message = new Message(req.body)
    message.save((err) => {
        if(err)
            sendStatus(500)
        Message.findOne({ message: 'badwords'}, (err, censored) => {
            if(censored){
                console.log('censored words found', censored)
                Message.remove({_id: censored.id}, (err) => {
                    console.log('censored words removed')
                })
            }
        })
        messages.push(req.body)
        io.emit('message', req.body)
        res.sendStatus(200)
    })
    
})

io.on('connection', (socket) => {
    console.log('a user connected')
})

mongoose.connect(dbURL, (err) => {
    console.log('mongo db connection', err)
})

var server = http.listen(3000, () =>{
    console.log('server is listening on port', server.address().port)
})
